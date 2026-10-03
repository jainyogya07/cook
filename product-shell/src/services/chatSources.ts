import { NewsItem } from '@/types/shell';
import { SourceLink } from '@/services/resultCards';

export function linksForQuery(query: string, news: NewsItem[], locale: 'en' | 'hi'): SourceLink[] {
  const q = query.toLowerCase();
  const hi = locale === 'hi';
  const links: SourceLink[] = [
    { label: hi ? 'IMD मौसम बुलेटिन' : 'IMD weather bulletin', url: 'https://mausam.imd.gov.in/' }
  ];
  if (/cyclone|चक्रवात|storm|depression|bay of bengal|तट/.test(q)) {
    links.push({
      label: hi ? 'IMD चक्रवात' : 'IMD cyclone desk',
      url: 'https://mausam.imd.gov.in/responsive/cycloneinformation.php'
    });
  }
  if (/onion|paddy|wheat|mandi|price|soy|भाव|मंडी|प्याज|धान|गेहूं/.test(q)) {
    links.push({ label: 'Agmarknet mandi', url: 'https://agmarknet.gov.in/' });
  }
  links.push({
    label: hi ? 'NDMA तैयारी' : 'NDMA preparedness',
    url: 'https://ndma.gov.in/'
  });
  news
    .filter((item) => item.url)
    .slice(0, 3)
    .forEach((item) => {
      links.push({ label: item.headline.slice(0, 72), url: item.url as string });
    });
  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.url)) return false;
    seen.add(link.url);
    return true;
  });
}
