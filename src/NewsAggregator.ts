import axios from 'axios';

interface NewsItem {
  source: string;
  title: string;
  html: string;
}

export async function fetchNews(): Promise<NewsItem[]> {
  const urls = [
    'https://www.sikafinance.com/marches',
    'https://www.richbourse.com/actualites'
  ];

  const news: NewsItem[] = [];

  for (const url of urls) {
    try {
      const res = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });

      // TODO: Remplacer 'title' par un vrai titre extrait avec cheerio
      news.push({
        source: url,
        title: 'À parser avec cheerio',
        html: res.data
      });
    } catch (error) {
      if (error instanceof Error) {
        console.warn(`⚠️ Erreur actualités ${url}:`, error.message);
      }
    }
  }

  return news;
}
