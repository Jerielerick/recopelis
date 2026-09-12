export type XtreamCredentials = {
  host: string;
  username: string;
  password: string;
};

export function parseXtreamFromPlaylistUrl(url: string): XtreamCredentials | null {
  try {
    const parsedUrl = new URL(url);
    const parts = parsedUrl.pathname.split("/").filter(Boolean);

    const playlistIndex = parts.findIndex((part) => part === "playlist");

    if (playlistIndex === -1) {
      return null;
    }

    const username = parts[playlistIndex + 1];
    const password = parts[playlistIndex + 2];

    if (!username || !password) {
      return null;
    }

    return {
      host: `${parsedUrl.protocol}//${parsedUrl.host}`,
      username,
      password,
    };
  } catch {
    return null;
  }
}

export function buildXtreamApiUrl(credentials: XtreamCredentials) {
  const apiUrl = new URL("/player_api.php", credentials.host);

  apiUrl.searchParams.set("username", credentials.username);
  apiUrl.searchParams.set("password", credentials.password);

  return apiUrl.toString();
}

export async function testXtreamConnection(
  credentials: XtreamCredentials
) {
  const response = await fetch(
    "http://localhost:3000/api/xtream/test",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }
  );

  if (!response.ok) {
    throw new Error(`Recopelis API error ${response.status}`);
  }

  const result = await response.json();

  return result.data;
}