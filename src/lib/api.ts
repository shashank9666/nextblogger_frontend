export type ApiError = { message: string };

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL is not set");
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(init.headers || {}) },
    cache: "no-store",
    ...init
  });
  if (!res.ok) {
    let msg = `API error: ${res.status}`;
    try {
      const data = (await res.json()) as ApiError;
      msg = data?.message || msg;
    } catch {}
    throw new Error(msg);
  }
  return res.json() as Promise<T>;
}
