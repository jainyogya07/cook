import { NextRequest, NextResponse } from 'next/server';

const SYSTEM = `You are ATMOS 4D, an India weather-to-mandi assistant for farmers, FPOs and district officers.
Speak ONLY the UI locale. English answers must use Latin script only — never mix Hindi words or Devanagari.
Hindi answers may use Devanagari. Be plain. 2–4 short sentences for the headline.
The UI already shows one result card per engine. Do not dump a long engine list.
Never claim a single exact yield or price as fact. Separate OBSERVED vs SCENARIO vs FORECAST. Exposure is not loss.`;

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as {
    messages?: { role: string; content: string }[];
    locale?: string;
    engines?: { module: number; title: string; metric: string }[];
  };
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return NextResponse.json({ ok: false, reason: 'no_key' });
  }
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const engineNote = (body.engines || [])
    .map((engine) => `M${engine.module} ${engine.title}: ${engine.metric}`)
    .join(' | ');
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        temperature: 0.4,
        messages: [
          { role: 'system', content: `${SYSTEM} UI locale=${body.locale || 'en'}. Engines already run: ${engineNote || 'none'}.` },
          ...(body.messages || []).slice(-12)
        ]
      })
    });
    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content;
    if (!text) return NextResponse.json({ ok: false, reason: 'empty' });
    return NextResponse.json({ ok: true, text });
  } catch {
    return NextResponse.json({ ok: false, reason: 'network' });
  }
}
