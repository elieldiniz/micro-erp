export async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.error || 'Erro na requisição');
  return json;
}

export const createAuthHeader = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

export const createJsonAuthHeader = (token: string) => ({
  'Content-Type': 'application/json',
  ...createAuthHeader(token),
});
