import { Card } from "../../../components/ui";

export default function PlayerPage() {
  return (
    <main className="player-page">
      <section className="player-container">
        <div className="player-screen">
          <p>Reproductor Recopelis</p>
        </div>

        <Card>
          <h1>Contenido de prueba</h1>
          <p>
            Aquí se integrará el reproductor HLS con fuentes M3U, Xtream y opciones alternativas.
          </p>
        </Card>
      </section>
    </main>
  );
}