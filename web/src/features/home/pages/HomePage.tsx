import { useRef, useState } from "react";

import "../../../App.css";
import "./HomePage.css";

import { Button, Card, Input } from "../../../components/ui";
import { loadM3u, type M3uItem } from "../../../services/m3uService";
import { saveM3uProfile } from "../../../services/userService";
import { useAuth } from "../../auth";

import {
  parseXtreamFromPlaylistUrl,
  testXtreamConnection,
} from "../../../services/xtreamService";

import { WebPlayer } from "../../player/components/WebPlayer";

function HomePage() {
  // =========================
  // 1. DATOS DE AUTENTICACIÓN
  // =========================

  const { user, isLoading, isAuthenticated } = useAuth();

  // =========================
  // 2. ESTADOS DEL COMPONENTE
  // =========================

  // Guarda la URL que escribe el usuario
  const [m3uUrl, setM3uUrl] = useState("");

  // Guarda mensajes para mostrar éxito o error
  const [message, setMessage] = useState("");

  // Indica si estamos guardando la lista
  const [isSaving, setIsSaving] = useState(false);

  // Indica si estamos cargando el catálogo
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(false);

  // Guarda todos los elementos obtenidos de la lista M3U
  const [catalogItems, setCatalogItems] = useState<M3uItem[]>([]);

  // Guarda el canal actualmente seleccionado
  const [selectedItem, setSelectedItem] = useState<M3uItem | null>(null);

  // Guarda el texto que escribe el usuario en el buscador
  const [searchTerm, setSearchTerm] = useState("");

  // Guarda la categoría seleccionada
  const [selectedGroup, setSelectedGroup] = useState("Todos");

  // =========================
  // 3. REFERENCIA DEL REPRODUCTOR
  // =========================

  // playerRef nos permite tener acceso directo
  // al <div> donde se encuentra el reproductor.
  //
  // Al inicio vale null porque el reproductor
  // todavía no existe en pantalla.
  const playerRef = useRef<HTMLDivElement | null>(null);

  // =========================
  // 4. GUARDAR LISTA
  // =========================

  async function handleSaveList() {
    setMessage("");

    // Si no hay usuario logueado, no permitimos guardar
    if (!user) {
      setMessage("Necesitas iniciar sesión para guardar una lista.");
      return;
    }

    // Validamos que exista una URL
    if (!m3uUrl.trim()) {
      setMessage("Ingresa una URL de lista M3U o Xtream.");
      return;
    }

    try {
      setIsSaving(true);

      // Guardamos la lista en Firebase
      await saveM3uProfile({
        uid: user.uid,
        name: "Lista principal",
        url: m3uUrl.trim(),
      });

      setMessage("Lista guardada correctamente.");
    } catch {
      setMessage("No se pudo guardar la lista. Intenta nuevamente.");
    } finally {
      // Pase lo que pase,
      // terminamos el estado de guardado
      setIsSaving(false);
    }
  }

  // =========================
  // 5. CARGAR CATÁLOGO
  // =========================

  async function handleLoadCatalog() {
    setMessage("");

    // Limpiamos el catálogo anterior
    setCatalogItems([]);

    // Quitamos cualquier canal seleccionado anteriormente
    setSelectedItem(null);

    // Validamos que exista una URL
    if (!m3uUrl.trim()) {
      setMessage("Ingresa una URL M3U para cargar el catálogo.");
      return;
    }

    try {
      setIsLoadingCatalog(true);

      // Quitamos espacios al inicio y al final
      const url = m3uUrl.trim();

      // Revisamos si la URL parece ser de tipo Xtream
      const xtreamCredentials = parseXtreamFromPlaylistUrl(url);

      if (xtreamCredentials) {
        const data = await testXtreamConnection(xtreamCredentials);

        console.log("Respuesta Xtream:", data);

        setMessage("Conexión Xtream correcta. Revisa la consola.");

        return;
      }

      // Si no es Xtream,
      // intentamos cargarla como una lista M3U normal
      const items = await loadM3u(url);

      // Guardamos TODOS los elementos encontrados
      setCatalogItems(items);

      setMessage(
        `Catálogo cargado: ${items.length} elementos encontrados.`
      );
    } catch (error) {
      console.error("Error al cargar M3U:", error);

      setMessage(
        "No se pudo cargar la lista M3U. Revisa la consola."
      );
    } finally {
      // Muy importante:
      // terminamos el estado de carga
      setIsLoadingCatalog(false);
    }
  }

  // =========================
  // 6. SELECCIONAR UN CANAL
  // =========================

  function handleSelectItem(item: M3uItem) {
    // Primero guardamos el canal seleccionado.
    //
    // Esto hace que React vuelva a renderizar
    // el componente HomePage.
    setSelectedItem(item);

    // Esperamos un instante para darle tiempo
    // a React de crear el reproductor en pantalla.
    setTimeout(() => {
      // playerRef.current representa el <div>
      // que contiene nuestro reproductor.
      //
      // El ?. significa:
      // "si playerRef.current existe, entonces ejecuta esto".
      playerRef.current?.scrollIntoView({
        // Movimiento suave
        behavior: "smooth",

        // Intenta colocar el reproductor
        // al inicio de la ventana
        block: "start",
      });
    }, 0);
  }

  // =========================
  // 7. OBTENER CATEGORÍAS
  // =========================

  // Aquí obtenemos todas las categorías
  // que existen dentro del catálogo.
  //
  // Algunas listas pueden traer algo como:
  //
  // "Sports;General;Entertainment"
  //
  // Por eso usamos split(";")
  // para convertirlas en categorías individuales.
  const groups = [
    "Todos",
    ...Array.from(
      new Set(
        catalogItems
          .flatMap((item) => item.group?.split(";") || [])
          .map((group) => group.trim())
          .filter((group) => group.length > 0)
      )
    ),
  ];

  // =========================
  // 8. FILTRAR CATÁLOGO
  // =========================

  // filteredItems NO necesita useState.
  //
  // Se calcula automáticamente cada vez que:
  //
  // - cambia catalogItems
  // - cambia searchTerm
  // - cambia selectedGroup
  const filteredItems = catalogItems.filter((item) => {
    // Revisamos si el título coincide
    // con lo que escribió el usuario
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Revisamos si el canal pertenece
    // a la categoría seleccionada.
    //
    // Si selectedGroup es "Todos",
    // entonces dejamos pasar cualquier canal.
    const matchesGroup =
      selectedGroup === "Todos" ||
      item.group
        ?.split(";")
        .map((group) => group.trim())
        .includes(selectedGroup);

    // El canal solo aparece si cumple
    // ambas condiciones.
    return matchesSearch && matchesGroup;
  });

  // =========================
  // 9. INTERFAZ
  // =========================

  return (
    <main className="home-page">
      {/* ========================= */}
      {/* HERO / CABECERA */}
      {/* ========================= */}

      <section className="home-hero">
        <div
          className="home-hero__glow"
          aria-hidden="true"
        />

        <div className="home-hero__content">
          <div className="home-hero__badge">
            RECOPelis · TU CENTRO DE ENTRETENIMIENTO
          </div>

          <h1>Todo tu contenido, en un solo lugar.</h1>

          <p className="home-hero__description">
            Reúne tus listas M3U y Xtream, organiza películas,
            series y canales, y disfruta una experiencia más
            limpia y personal.
          </p>

          {/* ========================= */}
          {/* ESTADO DE LA SESIÓN */}
          {/* ========================= */}

          <div className="home-session-card">
            <span
              className={`home-session-card__dot ${
                isAuthenticated ? "is-online" : ""
              }`}
            />

            <div>
              <strong>
                {isLoading
                  ? "Revisando sesión..."
                  : isAuthenticated
                    ? "Sesión activa"
                    : "Sesión no iniciada"}
              </strong>

              <span>
                {isLoading
                  ? "Verificando tu cuenta"
                  : isAuthenticated
                    ? user?.email
                    : "Inicia sesión para guardar tus listas"}
              </span>
            </div>
          </div>
        </div>

        {/* ========================= */}
        {/* TARJETA PARA CARGAR LISTA */}
        {/* ========================= */}

        <div className="home-hero__panel">
          <Card>
            <div className="home-list-card">
              <div className="home-list-card__header">
                <div>
                  <span className="home-list-card__eyebrow">
                    Fuente principal
                  </span>

                  <h2>Conecta tu catálogo</h2>
                </div>

                <span className="home-list-card__chip">
                  M3U / Xtream
                </span>
              </div>

              <p className="home-list-card__description">
                Pega la URL de tu lista para guardarla en tu
                cuenta o cargar una vista previa del catálogo.
              </p>

              <div className="home-list-form">
                <Input
                  label="URL de lista M3U o Xtream"
                  placeholder="https://servidor.com/lista.m3u"
                  value={m3uUrl}
                  disabled={isSaving || isLoadingCatalog}
                  onChange={setM3uUrl}
                />

                {/* Mensajes de éxito o error */}
                {message && (
                  <p className="home-list-card__message">
                    {message}
                  </p>
                )}

                <div className="home-list-card__actions">
                  <Button
                    onClick={handleSaveList}
                    disabled={isSaving || isLoadingCatalog}
                  >
                    {isSaving
                      ? "Guardando..."
                      : "Guardar lista"}
                  </Button>

                  <Button
                    onClick={handleLoadCatalog}
                    disabled={isSaving || isLoadingCatalog}
                  >
                    {isLoadingCatalog
                      ? "Cargando catálogo..."
                      : "Explorar catálogo"}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ========================= */}
      {/* CATÁLOGO */}
      {/* ========================= */}

      <section className="home-discover">
        {/* ========================= */}
        {/* REPRODUCTOR */}
        {/* ========================= */}

        {selectedItem && (
          <div
            // Aquí conectamos playerRef
            // con el elemento real del HTML
            ref={playerRef}
            className="home-player-panel"
          >
            <div className="home-player-panel__header">
              <div>
                <span className="home-player-panel__eyebrow">
                  Reproduciendo ahora
                </span>

                <h3>{selectedItem.title}</h3>

                <p>
                  {selectedItem.group || "Sin categoría"}
                </p>
              </div>

              <button
                type="button"
                className="home-player-panel__close"

                // Al cerrar ponemos selectedItem en null.
                //
                // Como selectedItem deja de existir,
                // React deja de mostrar este bloque.
                onClick={() => setSelectedItem(null)}
              >
                Cerrar
              </button>
            </div>

            <WebPlayer url={selectedItem.url} />
          </div>
        )}

        {/* ========================= */}
        {/* ENCABEZADO DEL CATÁLOGO */}
        {/* ========================= */}

        <div className="home-section-heading">
          <div>
            <span className="home-section-heading__eyebrow">
              Vista previa
            </span>

            <h2>Tu contenido empieza aquí</h2>
          </div>

          <p>
            {catalogItems.length > 0
              ? `${filteredItems.length} de ${catalogItems.length} títulos`
              : "Carga una lista para ver tu catálogo."}
          </p>
        </div>

        {/* ========================= */}
        {/* BUSCADOR */}
        {/* ========================= */}

        {catalogItems.length > 0 && (
          <Input
            label="Buscar contenido"
            placeholder="Ej. ESPN, noticias, películas..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
        )}

        {/* ========================= */}
        {/* FILTROS DE CATEGORÍA */}
        {/* ========================= */}

        {catalogItems.length > 0 && (
          <div className="home-group-filters">
            {groups.map((group) => (
              <button
                key={group}
                type="button"

                // Si esta categoría está seleccionada,
                // agregamos la clase is-active
                className={
                  selectedGroup === group
                    ? "home-group-filter is-active"
                    : "home-group-filter"
                }

                // Cambiamos la categoría seleccionada
                onClick={() => setSelectedGroup(group)}
              >
                {group}
              </button>
            ))}
          </div>
        )}

        {/* ========================= */}
        {/* RESULTADOS */}
        {/* ========================= */}

        {catalogItems.length > 0 ? (
          <>
            {filteredItems.length > 0 ? (
              <div className="home-catalog-grid">
                {filteredItems.map((item) => (
                  <article
                    // Si este canal es el seleccionado,
                    // agregamos la clase is-selected
                    className={
                      selectedItem?.id === item.id
                        ? "home-media-card is-selected"
                        : "home-media-card"
                    }

                    key={item.id}

                    // Antes hacíamos:
                    //
                    // setSelectedItem(item)
                    //
                    // Ahora usamos handleSelectItem
                    // porque además de seleccionar el canal,
                    // hace scroll automático al reproductor.
                    onClick={() => handleSelectItem(item)}
                  >
                    <div className="home-media-card__poster">
                      {item.logo ? (
                        <img
                          src={item.logo}
                          alt=""
                          loading="lazy"
                        />
                      ) : (
                        <div className="home-media-card__fallback">
                          REC
                        </div>
                      )}

                      <span className="home-media-card__type">
                        {item.type}
                      </span>
                    </div>

                    <div className="home-media-card__body">
                      <h3>{item.title}</h3>

                      <p>
                        {item.group || "Sin categoría"}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              // Esto aparece cuando sí existe catálogo,
              // pero ningún elemento coincide con los filtros
              <div className="home-empty-state">
                <span className="home-empty-state__icon">
                  🔎
                </span>

                <h3>No encontramos resultados</h3>

                <p>
                  Prueba con otro nombre o elimina parte de la
                  búsqueda.
                </p>
              </div>
            )}
          </>
        ) : (
          // Esto aparece antes de cargar una lista
          <div className="home-empty-state">
            <span className="home-empty-state__icon">
              ▶
            </span>

            <h3>Tu biblioteca aparecerá aquí</h3>

            <p>
              Agrega una lista válida y Recopelis te mostrará
              el contenido disponible.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

export default HomePage;