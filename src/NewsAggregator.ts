import axios from 'axios';
import * as cheerio from 'cheerio';

interface NewsItem {
  source: string;
  title: string;
  html: string;
}

export async function fetchNews(): Promise<NewsItem[]> {
  const urls = [
    'https://www.sikafinance.com/marches/actualites_bourse_brvm',
    'https://www.sikafinance.com/marches/communiques_brvm',
    'https://www.sikafinance.com/marches/aaz',
    'https://www.sikafinance.com/applet/graphe_dynamique',
    'https://www.richbourse.com/common/variation/index',
    'https://www.richbourse.com/common/actualite/index',
    'https://www.richbourse.com/common/mouvements/index',
    'https://www.richbourse.com/common/apprendre/articles',
  ];

  const news: NewsItem[] = [];

  for (const url of urls) {
    try {
      const res = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });

      const $ = cheerio.load(res.data);

      if (url.includes('sikafinance')) {
        $('.bloc-actu .title a').each((_, el) => {
          const title = $(el).text().trim();
          const html = $.html(el);
          if (title) news.push({ source: 'Sikafinance', title, html });
        });
      }

      if (url.includes('richbourse')) {
        $('.card-title a').each((_, el) => {
          const title = $(el).text().trim();
          const html = $.html(el);
          if (title) news.push({ source: 'RichBourse', title, html });
        });
      }
    } catch (error) {
      console.warn(`⚠️ Erreur actualités ${url}:`, (error as Error).message);
    }
  }

  if (news.length === 0) {
    console.warn('⚠️ Aucune actualité récupérée — fallback utilisé');
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
  } else {
    console.log(`✅ ${news.length} actualités récupérées`);
  }

  return news;
}
