import "../../../App.css";
import { Button, Card, Input } from "../../../components/ui";

function HomePage() {
  return (
    <main className="app-shell">
      <section className="hero">
        <p className="hero__label">Recopelis</p>
        <h1>Tu plataforma IPTV/VOD personal</h1>
        <p className="hero__description">
          Organiza listas M3U, Xtream Codes, películas, series y canales desde una sola app.
        </p>

        <Card>
          <Input
            label="URL de lista M3U o Xtream"
            placeholder="https://servidor.com/lista.m3u"
          />
          <Button>Comenzar</Button>
        </Card>
      </section>
    </main>
  );
}

export default HomePage;