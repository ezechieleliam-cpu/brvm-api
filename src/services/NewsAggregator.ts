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

      // TODO: Extraire le vrai titre avec cheerio
      news.push({
        source: url,
        title: 'À parser avec cheerio',
        html: res.data
      });
    } catch (error) {
      console.warn(`⚠️ Erreur actualités ${url}:`, (error as Error).message);
    }
  }

  // Fallback si aucune actualité n’a été récupérée
  if (news.length === 0) {
    news.push(
      {
        source: 'Ecofin',
        title: 'BRVM monte',
        html: '<p>Actualité fictive du 2025-10-06</p>'
      },
      {
        source: 'Jeune Afrique',
        title: 'SIB CI performe',
        html: '<p>Actualité fictive du 2025-10-05</p>'
      }
    );
  }

  return news;
}
