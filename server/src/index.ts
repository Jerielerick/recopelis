import express from "express";
import cors from "cors";

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    message: "Recopelis API funcionando",
  });
});

app.post("/api/xtream/test", async (req, res) => {
  try {
    const { host, username, password } = req.body;

    if (!host || !username || !password) {
      return res.status(400).json({
        ok: false,
        message: "Faltan datos de conexión",
      });
    }

    const apiUrl = new URL("/get.php", host);

    apiUrl.searchParams.set("username", username);
    apiUrl.searchParams.set("password", password);
    apiUrl.searchParams.set("type", "m3u_plus");
apiUrl.searchParams.set("output", "ts");

    const response = await fetch(apiUrl);

    if (!response.ok) {
      return res.status(response.status).json({
        ok: false,
        message: "El servidor Xtream respondió con un error",
      });
    }

    const rawData = await response.text();

console.log("Xtream status:", response.status);
console.log("Xtream content-type:", response.headers.get("content-type"));
console.log("Xtream respuesta:", rawData.slice(0, 300));



return res.json({
  ok: true,
  startsWithM3u: rawData.includes("#EXTM3U"),
  preview: rawData.slice(0, 200),
});
  } catch (error) {
    console.error("Error Xtream:", error);

    return res.status(500).json({
      ok: false,
      message: "No se pudo conectar con el servidor Xtream",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Recopelis API ejecutándose en http://localhost:${PORT}`);
});