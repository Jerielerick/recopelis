import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";

type WebPlayerProps = {
  url: string;
};

export function WebPlayer({ url }: WebPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [status, setStatus] = useState("Esperando URL");

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !url) {
      setStatus("Esperando URL");
      return;
    }

    hlsRef.current?.destroy();
    hlsRef.current = null;

    setStatus("Cargando...");

    if (Hls.isSupported()) {
      const hls = new Hls();

      hlsRef.current = hls;
      hls.loadSource(url);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setStatus("Listo para reproducir");
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          setStatus("Error al reproducir el contenido");
        }
      });

      return () => {
        hls.destroy();
      };
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
      setStatus("Listo para reproducir");
      return;
    }

    setStatus("HLS no es compatible en este navegador");
  }, [url]);

  return (
    <div className="web-player">
      <video ref={videoRef} controls className="web-player__video" />
      <p className="web-player__status">Estado: {status}</p>
    </div>
  );
}