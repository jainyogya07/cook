import { NextRequest, NextResponse } from 'next/server';

const RENDER = 'https://atmos-4d-backend.onrender.com';

function bases() {
  const raw = [process.env.AUTH_API_URL, process.env.NEXT_PUBLIC_API_URL, RENDER]
    .filter(Boolean)
    .map((item) => String(item).replace(/\/$/, ''));
  return [...new Set(raw)];
}

async function forward(request: NextRequest, path: string) {
  const auth = request.headers.get('authorization') || '';
  const body = request.method === 'GET' ? undefined : await request.text();
  let last: { status: number; json: unknown } = {
    status: 503,
    json: {
      detail:
        'Auth server is waking up or unreachable. Wait 20 seconds and try again.'
    }
  };

  for (const base of bases()) {
    try {
      const response = await fetch(`${base}/auth/${path}`, {
        method: request.method,
        headers: {
          'Content-Type': 'application/json',
          ...(auth ? { Authorization: auth } : {})
        },
        body,
        cache: 'no-store',
        signal: AbortSignal.timeout(base.includes('localhost') || base.includes('127.0.0.1') ? 2500 : 28000)
      });
      const json = await response.json().catch(() => ({}));
      if (response.ok || (response.status >= 400 && response.status < 500)) {
        return NextResponse.json(json, { status: response.status });
      }
      last = { status: response.status, json };
    } catch {
      /* try next host */
    }
  }

  return NextResponse.json(last.json, { status: last.status });
}

export async function POST(request: NextRequest, context: { params: { path: string } }) {
  return forward(request, context.params.path);
}

export async function GET(request: NextRequest, context: { params: { path: string } }) {
  return forward(request, context.params.path);
}
