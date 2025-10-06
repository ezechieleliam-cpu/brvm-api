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
            const res = await axios_1.default.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
            news.push({ source: url, title: 'À parser avec cheerio', html: res.data });
        }
        catch (error) {
            console.warn(`⚠️ Erreur actualités ${url}:`, error.message);
        }
    }
    return news;
}
