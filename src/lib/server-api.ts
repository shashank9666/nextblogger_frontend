// src/lib/server-api.ts
// Server-only fetch helper for App Router Server Components and Route Handlers.

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  "http://localhost:4000";

type JsonError = { message?: string; error?: string };

function getBaseHeaders(): Record<string, string> {
  return {
    "Content-Type": "application/json",
  };
}

async function parseError(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as JsonError;
    return data.message || data.error || `API error: ${res.status}`;
  } catch {
    return `API error: ${res.status}`;
  }
}

/**
 * Server-side fetch wrapper. Do NOT import in Client Components.
 * It does not use js-cookie or any browser APIs.
 */
export async function serverApiRequest<T = unknown>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  if (!API_URL) {
    throw new Error("API base URL is not configured on the server.");
  }

  const mergedHeaders: HeadersInit =
    init.headers instanceof Headers
      ? init.headers
      : { ...getBaseHeaders(), ...(init.headers as Record<string, string> | undefined) };

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: mergedHeaders,
    // In RSC this runs on the server; avoid caching for dynamic data
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(await parseError(res));
  }

  if (res.status === 204) return undefined as T;

  return (await res.json()) as T;
}
