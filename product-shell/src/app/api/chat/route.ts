import { NextRequest, NextResponse } from 'next/server';

const SYSTEM = `You are ATMOS 4D, an India weather-to-mandi assistant for farmers, FPOs, officers and researchers.
Speak ONLY the UI locale. English = Latin script only. Hindi may use Devanagari. Never mix scripts.
Write a high-quality answer: 5–8 short sentences.
Cover: (1) what is likely in plain words, (2) what to do in the next 24–72 hours, (3) what is still uncertain, (4) official places to verify.
Always include markdown links to IMD and any live news URLs given to you.
Never invent a single exact yield or mandi price. Label FORECAST vs SCENARIO. Exposure is not loss.
The UI already shows easy cards. Do not dump engine jargon in the farmer answer.`;

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as {
    messages?: { role: string; content: string }[];
    locale?: string;
    engines?: { module: number; title: string; metric: string }[];
    news?: { title: string; url: string }[];
  };
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return NextResponse.json({ ok: false, reason: 'no_key' });
  }
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const engineNote = (body.engines || [])
    .map((engine) => `M${engine.module} ${engine.title}: ${engine.metric}`)
    .join(' | ');
  const newsNote = (body.news || [])
    .filter((item) => item.url)
    .slice(0, 5)
    .map((item) => `${item.title} (${item.url})`)
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
          { role: 'system', content: `${SYSTEM} UI locale=${body.locale || 'en'}. Specialist engines (do not dump these numbers in the farmer answer): ${engineNote || 'none'}. Live news to cite: ${newsNote || 'none'}. Always link https://mausam.imd.gov.in/` },
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
