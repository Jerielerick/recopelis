import { useState } from "react";
import "../../../App.css";
import { Button, Card, Input } from "../../../components/ui";
import { saveM3uProfile } from "../../../services/userService";
import { useAuth } from "../../auth";

function HomePage() {
  const { user, isLoading, isAuthenticated } = useAuth();

  const [m3uUrl, setM3uUrl] = useState("");
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

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
      setM3uUrl("");
    } catch {
      setMessage("No se pudo guardar la lista. Intenta nuevamente.");
    } finally {
      setIsSaving(false);
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
              disabled={isSaving}
              onChange={setM3uUrl}
            />

            {message && <p className="auth-form__description">{message}</p>}

            <Button onClick={handleSaveList} disabled={isSaving}>
              {isSaving ? "Guardando..." : "Guardar lista"}
            </Button>
          </div>
        </Card>
      </section>
    </main>
  );
}

export default HomePage;