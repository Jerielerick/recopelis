import { useState } from "react";
import "../../../App.css";
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
    <main className="app-shell">
      <section className="hero">
        <p className="hero__label">Recopelis</p>
        <h1>Tu plataforma IPTV/VOD personal</h1>
        <p className="hero__description">
          Organiza listas M3U, Xtream Codes, películas, series y canales desde una sola app.
        </p>

        <p className="hero__description">
          {isLoading
            ? "Revisando sesión..."
            : isAuthenticated
              ? `Sesión iniciada como ${user?.email}`
              : "No has iniciado sesión."}
        </p>

        <Card>
          <div className="home-list-form">
            <Input
              label="URL de lista M3U o Xtream"
              placeholder="https://servidor.com/lista.m3u"
              value={m3uUrl}
              disabled={isSaving || isLoadingCatalog}
              onChange={setM3uUrl}
            />

            {message && <p className="auth-form__description">{message}</p>}

            <Button onClick={handleSaveList} disabled={isSaving || isLoadingCatalog}>
              {isSaving ? "Guardando..." : "Guardar lista"}
            </Button>

            <Button onClick={handleLoadCatalog} disabled={isSaving || isLoadingCatalog}>
              {isLoadingCatalog ? "Cargando catálogo..." : "Cargar catálogo"}
            </Button>
          </div>
        </Card>

        {catalogItems.length > 0 && (
          <div className="catalog-preview">
            {catalogItems.map((item) => (
              <Card key={item.id}>
                <h3>{item.title}</h3>
                <p>Tipo: {item.type}</p>
                {item.group && <p>Grupo: {item.group}</p>}
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default HomePage;