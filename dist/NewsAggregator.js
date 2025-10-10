import axios from 'axios';
import * as cheerio from 'cheerio';
export async function fetchNews() {
    const urls = [
        'https://www.sikafinance.com/marches/actualites_bourse_brvm',
        'https://www.sikafinance.com/marches/communiques_brvm',
        'https://www.sikafinance.com/marches/aaz',
        'https://www.sikafinance.com/applet/graphe_dynamique',
        'https://www.richbourse.com/common/variation/index',
        'https://www.richbourse.com/common/actualite/index',
        'https://www.richbourse.com/common/mouvements/index',
        'https://www.richbourse.com/common/apprendre/articles'
    ];
    const news = [];
    for (const url of urls) {
        try {
            const res = await axios.get(url, {
                headers: { 'User-Agent': 'Mozilla/5.0' },
                timeout: 15000
            });
            const $ = cheerio.load(res.data);
            if (url.includes('sikafinance')) {
                $('.bloc-actu .title a').each((_, el) => {
                    const title = $(el).text().trim();
                    const html = $.html(el);
                    if (title) {
                        news.push({
                            source: 'Sikafinance',
                            title,
                            html,
                            date: new Date() // ✅ requis pour MongoDB
                        });
                    }
                });
            }
            if (url.includes('richbourse')) {
                $('.card-title a').each((_, el) => {
                    const title = $(el).text().trim();
                    const html = $.html(el);
                    if (title) {
                        news.push({
                            source: 'RichBourse',
                            title,
                            html,
                            date: new Date() // ✅ requis pour MongoDB
                        });
                    }
                });
            }
        }
        catch (error) {
            console.warn(`⚠️ Erreur actualités ${url}:`, error.message);
        }
    }
    if (news.length === 0) {
        console.warn('⚠️ Aucune actualité récupérée — fallback utilisé');
        news.push({
            source: 'Ecofin',
            title: 'BRVM monte',
            html: '<p>Actualité fictive du 2025-10-06</p>',
            date: new Date('2025-10-06')
        }, {
            source: 'Jeune Afrique',
            title: 'SIB CI performe',
            html: '<p>Actualité fictive du 2025-10-05</p>',
            date: new Date('2025-10-05')
        });
    }
    else {
        console.log(`✅ ${news.length} actualités récupérées`);
    }
    return news;
}
