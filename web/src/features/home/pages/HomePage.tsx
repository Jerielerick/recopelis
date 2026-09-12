import { useState } from "react";
import "../../../App.css";
import "./HomePage.css";
import { Button, Card, Input } from "../../../components/ui";
import { loadM3u, type M3uItem } from "../../../services/m3uService";
import { saveM3uProfile } from "../../../services/userService";
import { useAuth } from "../../auth";

function HomePage() {
  const { user, isLoading, isAuthenticated } = useAuth();

  const [m3uUrl, setM3uUrl] = useState("");
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(false);
  const [catalogItems, setCatalogItems] = useState<M3uItem[]>([]);

  async function handleSaveList() {
    setMessage("");

    if (!user) {
      setMessage("Necesitas iniciar sesión para guardar una lista.");
      return;
    }

    if (!m3uUrl.trim()) {
      setMessage("Ingresa una URL de lista M3U o Xtream.");
      return;
    }

    try {
      setIsSaving(true);

      await saveM3uProfile({
        uid: user.uid,
        name: "Lista principal",
        url: m3uUrl.trim(),
      });

      setMessage("Lista guardada correctamente.");
    } catch {
      setMessage("No se pudo guardar la lista. Intenta nuevamente.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleLoadCatalog() {
    setMessage("");
    setCatalogItems([]);

    if (!m3uUrl.trim()) {
      setMessage("Ingresa una URL M3U para cargar el catálogo.");
      return;
    }

    try {
      setIsLoadingCatalog(true);

      const items = await loadM3u(m3uUrl.trim());

      setCatalogItems(items.slice(0, 12));
      setMessage(`Catálogo cargado: ${items.length} elementos encontrados.`);
    } catch {
      setMessage("No se pudo cargar la lista M3U. Revisa la URL o permisos CORS.");
    } finally {
      setIsLoadingCatalog(false);
    }
  }

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero__glow" aria-hidden="true" />

        <div className="home-hero__content">
          <div className="home-hero__badge">RECOPelis · TU CENTRO DE ENTRETENIMIENTO</div>

          <h1>Todo tu contenido, en un solo lugar.</h1>

          <p className="home-hero__description">
            Reúne tus listas M3U y Xtream, organiza películas, series y canales, y disfruta una experiencia más limpia y personal.
          </p>

          <div className="home-session-card">
            <span className={`home-session-card__dot ${isAuthenticated ? "is-online" : ""}`} />
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

        <div className="home-hero__panel">
          <Card>
            <div className="home-list-card">
              <div className="home-list-card__header">
                <div>
                  <span className="home-list-card__eyebrow">Fuente principal</span>
                  <h2>Conecta tu catálogo</h2>
                </div>
                <span className="home-list-card__chip">M3U / Xtream</span>
              </div>

              <p className="home-list-card__description">
                Pega la URL de tu lista para guardarla en tu cuenta o cargar una vista previa del catálogo.
              </p>

              <div className="home-list-form">
                <Input
                  label="URL de lista M3U o Xtream"
                  placeholder="https://servidor.com/lista.m3u"
                  value={m3uUrl}
                  disabled={isSaving || isLoadingCatalog}
                  onChange={setM3uUrl}
                />

                {message && <p className="home-list-card__message">{message}</p>}

                <div className="home-list-card__actions">
                  <Button onClick={handleSaveList} disabled={isSaving || isLoadingCatalog}>
                    {isSaving ? "Guardando..." : "Guardar lista"}
                  </Button>

                  <Button onClick={handleLoadCatalog} disabled={isSaving || isLoadingCatalog}>
                    {isLoadingCatalog ? "Cargando catálogo..." : "Explorar catálogo"}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="home-discover">
        <div className="home-section-heading">
          <div>
            <span className="home-section-heading__eyebrow">Vista previa</span>
            <h2>Tu contenido empieza aquí</h2>
          </div>
          <p>
            {catalogItems.length > 0
              ? `${catalogItems.length} títulos mostrados`
              : "Carga una lista para ver los primeros títulos de tu catálogo."}
          </p>
        </div>

        {catalogItems.length > 0 ? (
          <div className="home-catalog-grid">
            {catalogItems.map((item) => (
              <article className="home-media-card" key={item.id}>
                <div className="home-media-card__poster">
                  {item.logo ? (
                    <img src={item.logo} alt="" loading="lazy" />
                  ) : (
                    <div className="home-media-card__fallback">REC</div>
                  )}
                  <span className="home-media-card__type">{item.type}</span>
                </div>

                <div className="home-media-card__body">
                  <h3>{item.title}</h3>
                  <p>{item.group || "Sin categoría"}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="home-empty-state">
            <span className="home-empty-state__icon">▶</span>
            <h3>Tu biblioteca aparecerá aquí</h3>
            <p>Agrega una lista válida y Recopelis te mostrará una vista previa del contenido disponible.</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default HomePage;
