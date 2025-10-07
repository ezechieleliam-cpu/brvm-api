"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchNews = fetchNews;
const axios_1 = __importDefault(require("axios"));
async function fetchNews() {
    const urls = [
        'https://www.sikafinance.com/marches',
        'https://www.richbourse.com/actualites'
    ];
    const news = [];
    for (const url of urls) {
        try {
            const res = await axios_1.default.get(url, {
                headers: { 'User-Agent': 'Mozilla/5.0' }
            });
            // TODO: Extraire le vrai titre avec cheerio
            news.push({
                source: url,
                title: 'À parser avec cheerio',
                html: res.data
            });
        }
        catch (error) {
            console.warn(`⚠️ Erreur actualités ${url}:`, error.message);
        }
    }
    // Fallback si aucune actualité n’a été récupérée
    if (news.length === 0) {
        news.push({
            source: 'Ecofin',
            title: 'BRVM monte',
            html: '<p>Actualité fictive du 2025-10-06</p>'
        }, {
            source: 'Jeune Afrique',
            title: 'SIB CI performe',
            html: '<p>Actualité fictive du 2025-10-05</p>'
        });
    }
    return news;
}
