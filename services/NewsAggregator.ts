import axios from 'axios';

export async function fetchNews(): Promise<any[]> {
  const urls = [
    'https://www.sikafinance.com/marches',
    'https://www.richbourse.com/actualites'
  ];

  const news: any[] = [];

  for (const url of urls) {
    try {
      const res = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      news.push({ source: url, title: 'À parser avec cheerio', html: res.data });
    } catch (error) {
      console.warn(`⚠️ Erreur actualités ${url}:`, error.message);
    }
  }

  return news;
}
