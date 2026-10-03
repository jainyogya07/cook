export function decodeEntities(value: string): string {
  let text = value;
  for (let i = 0; i < 3; i += 1) {
    text = text
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#x27;/gi, "'");
  }
  return text;
}

export function cleanNewsText(raw?: string | null): string {
  if (!raw) return '';
  let text = decodeEntities(raw);
  text = text.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
  text = text.replace(/<script[\s\S]*?<\/script>/gi, ' ');
  text = text.replace(/<a\b[^>]*>[\s\S]*?<\/a>/gi, ' ');
  text = text.replace(/<[^>]+>/g, ' ');
  text = text.replace(/https?:\/\/\S+/g, ' ');
  return text.replace(/\s+/g, ' ').trim();
}

export function newsSummary(title: string, description?: string | null): string {
  const headline = cleanNewsText(title);
  const body = cleanNewsText(description);
  if (!body || body === headline || headline.includes(body) || body.includes(headline.slice(0, 40))) {
    return headline;
  }
  return `${headline}\n\n${body}`;
}
