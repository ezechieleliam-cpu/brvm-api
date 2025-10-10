"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNews = updateNews;
exports.autoUpdate = autoUpdate;
const cache_1 = require("./utils/cache");
const Stock_1 = require("./models/Stock");
const NewsAggregator_1 = require("./NewsAggregator");
const MarketScheduler_1 = require("./MarketScheduler");
const NewsModel_1 = require("./models/NewsModel");
async function updateNews(news) {
    await NewsModel_1.NewsModel.deleteMany({});
    await NewsModel_1.NewsModel.insertMany(news);
}
async function autoUpdate() {
    try {
        const marketOpen = (0, MarketScheduler_1.isMarketOpen)();
        if (!marketOpen) {
            console.log('⏳ Marché fermé');
            return;
        }
        console.log('🔄 Mise à jour des données BRVM...');
        const fakeData = [
            { symbol: 'SGBC', name: 'Société Générale CI', price: 1450, change: 2.5, date: new Date() },
            { symbol: 'ETIT', name: 'Ecobank Transnational', price: 22, change: -1.2, date: new Date() }
        ];
        await Stock_1.StockModel.deleteMany({});
        await Stock_1.StockModel.insertMany(fakeData);
        cache_1.cache.set('brvmData', fakeData);
        const news = await (0, NewsAggregator_1.fetchNews)();
        if (news.length === 0) {
            console.warn('⚠️ Aucune actualité réelle — fallback utilisé');
        }
        await updateNews(news); // ✅ insertion MongoDB
        cache_1.cache.set('brvmNews', news);
        console.log('🧪 Actualités récupérées :', news);
    }
    catch (error) {
        console.error('❌ Erreur autoUpdate :', error.message);
    }
}
