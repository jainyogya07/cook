import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const payload = (await request.json().catch(() => ({}))) as {
    text?: string;
    target?: string;
    source?: string;
  };
  const text = (payload.text || '').slice(0, 500);
  if (!text) return NextResponse.json({ text: '' });
  const target = payload.target === 'hi' ? 'hi' : 'en';
  const source = payload.source === 'hi' || payload.source === 'en' ? payload.source : target === 'hi' ? 'en' : 'hi';
  if (source === target) return NextResponse.json({ text });

  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;
  try {
    const response = await fetch(url, { next: { revalidate: 0 } });
    const data = await response.json();
    return NextResponse.json({ text: data?.responseData?.translatedText || text });
  } catch {
    return NextResponse.json({ text });
  }
}
