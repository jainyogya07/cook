import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const hazard = searchParams.get('hazard') || 'weather';
  const region = searchParams.get('region') || 'India';
  const language = searchParams.get('language') === 'hi' ? 'hi' : 'en';
  const limit = Math.min(Number(searchParams.get('limit') || 8), 12);
  const query = hazard.toLowerCase() === 'mandi' ? `mandi APMC wholesale ${region}` : `${hazard} ${region} weather`;
  const hl = language === 'hi' ? 'hi-IN' : 'en-IN';
  const ceid = language === 'hi' ? 'IN:hi' : 'IN:en';
  const rss = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=${hl}&gl=IN&ceid=${ceid}`;

  try {
    const response = await fetch(rss, { next: { revalidate: 120 } });
    const xml = await response.text();
    const matches = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/g));
    const items = matches.slice(0, limit).map((match, index) => {
      const block = match[1];
      const pick = (tag: string) => block.match(new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`))?.[1]
        || block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`))?.[1]
        || '';
      const title = pick('title').trim();
      const description = pick('description').replace(/<[^>]+>/g, '').trim();
      return {
        id: `gnews_${index}_${Buffer.from(title).toString('base64').slice(0, 10)}`,
        title,
        description,
        source: pick('source') || 'Google News',
        url: pick('link'),
        image: null,
        message: description ? `${title}\n\n${description}` : title,
        hazard,
        region,
        time_ago: 'Live'
      };
    });
    return NextResponse.json({ articles: items, articles_count: items.length, language, active_provider: 'Google News RSS' });
  } catch {
    return NextResponse.json({ articles: [], articles_count: 0, language, active_provider: 'Google News RSS' });
  }
}
