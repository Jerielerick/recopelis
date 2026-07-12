export type M3uItem = {
  id: string;
  title: string;
  url: string;
  logo?: string;
  group?: string;
  tvgId?: string;
  type: "live" | "movie" | "series" | "unknown";
};

function getAttribute(line: string, name: string) {
  const match = line.match(new RegExp(`${name}="([^"]*)"`, "i"));
  return match?.[1] || "";
}

function detectType(url: string, group?: string): M3uItem["type"] {
  const value = `${url} ${group || ""}`.toLowerCase();

  if (value.includes("/movie/") || value.includes("pelicula") || value.includes("movies")) {
    return "movie";
  }

  if (value.includes("/series/") || value.includes("serie")) {
    return "series";
  }

  if (value.includes("/live/") || value.includes("canales") || value.includes("tv")) {
    return "live";
  }

  return "unknown";
}

export function parseM3u(content: string): M3uItem[] {
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const items: M3uItem[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (!line.startsWith("#EXTINF")) continue;

    const title = line.split(",").pop()?.trim() || "Sin título";
    const url = lines[index + 1] || "";

    if (!url || url.startsWith("#")) continue;

    const group = getAttribute(line, "group-title");
    const logo = getAttribute(line, "tvg-logo");
    const tvgId = getAttribute(line, "tvg-id");

    items.push({
      id: `${title}-${url}`,
      title,
      url,
      group,
      logo,
      tvgId,
      type: detectType(url, group),
    });
  }

  return items;
}
export async function loadM3u(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`M3U error ${response.status}`);
  }

  const content = await response.text();

  if (!content.includes("#EXTM3U") && !content.includes("#EXTINF")) {
    throw new Error("M3U empty or invalid content");
  }

  return parseM3u(content);
}