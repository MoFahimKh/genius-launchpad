import { env } from "@/lib/env";

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const baseUrl = env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    }
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed (${res.status}): ${text}`);
  }

  return (await res.json()) as T;
}
