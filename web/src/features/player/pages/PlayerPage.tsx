import { useState } from "react";
import { Button, Card, Input } from "../../../components/ui";
import { WebPlayer } from "../components/WebPlayer";

export default function PlayerPage() {
  const [url, setUrl] = useState("");
  const [playerUrl, setPlayerUrl] = useState("");

  function handlePlay() {
    setPlayerUrl(url.trim());
  }

  return (
    <main className="player-page">
      <section className="player-container">
        <WebPlayer url={playerUrl} />

        <Card>
          <h1>Reproductor HLS</h1>
          <p>
            Pega una URL .m3u8 para probar el reproductor web de Recopelis.
          </p>

          <div className="home-list-form">
            <Input
              label="URL HLS"
              placeholder="https://servidor.com/video.m3u8"
              value={url}
              onChange={setUrl}
            />

            <Button onClick={handlePlay}>Reproducir</Button>
          </div>
        </Card>
      </section>
    </main>
  );
}