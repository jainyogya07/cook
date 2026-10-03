export function apiBase() {
  const env = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');
  if (env) return env;
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') return 'http://localhost:8000';
  }
  return '';
}

export function newsEndpoint(query: string) {
  const base = apiBase();
  return base ? `${base}/weather/news?${query}` : `/api/news?${query}`;
}

export function translateEndpoint() {
  const base = apiBase();
  return base ? `${base}/weather/news/translate` : '/api/translate';
}

export function authEndpoint(path: string) {
  return `${apiBase() || ''}/auth/${path.replace(/^\//, '')}`;
}
