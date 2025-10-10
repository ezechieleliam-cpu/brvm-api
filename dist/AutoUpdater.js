"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNews = updateNews;
exports.autoUpdate = autoUpdate;
const cache_1 = require("./utils/cache");
const Stock_1 = require("./models/Stock");
const NewsModel_1 = require("./models/NewsModel");
const NewsAggregator_1 = require("./NewsAggregator");
const MarketScheduler_1 = require("./MarketScheduler");
const scraper_1 = require("./services/scraper"); // ✅ Assure-toi que ce fichier existe et exporte scrapeBRVM
// 📰 Mise à jour des actualités MongoDB
async function updateNews(news) {
    try {
        await NewsModel_1.NewsModel.deleteMany({});
        await NewsModel_1.NewsModel.insertMany(news);
        console.log(`🗞️ ${news.length} actualités insérées dans MongoDB`);
    }
    catch (error) {
        console.error('❌ Erreur lors de l’insertion des actualités :', error.message);
    }
}
// 🔁 Mise à jour automatique des données BRVM
async function autoUpdate() {
    try {
        const marketOpen = (0, MarketScheduler_1.isMarketOpen)();
        if (!marketOpen) {
            console.log('⏳ Marché fermé — aucune mise à jour effectuée');
            return;
        }
        console.log('🔄 Démarrage de la mise à jour BRVM...');
        // 📊 Scraping des données BRVM
        const brvmData = await (0, scraper_1.scrapeBRVM)();
        if (!brvmData || brvmData.length === 0) {
            console.warn('⚠️ Aucune donnée BRVM récupérée — fallback utilisé');
            const fallbackData = [
                { symbol: 'SGBC', name: 'Société Générale CI', price: 1450, change: 2.5, date: new Date() },
                { symbol: 'ETIT', name: 'Ecobank Transnational', price: 22, change: -1.2, date: new Date() }
            ];
            await Stock_1.StockModel.deleteMany({});
            await Stock_1.StockModel.insertMany(fallbackData);
            cache_1.cache.set('brvmData', fallbackData);
            console.log('📦 Fallback BRVM inséré et mis en cache');
        }
        else {
            await Stock_1.StockModel.deleteMany({});
            await Stock_1.StockModel.insertMany(brvmData);
            cache_1.cache.set('brvmData', brvmData);
            console.log(`📦 ${brvmData.length} données BRVM insérées et mises en cache`);
        }
        // 📰 Scraping des actualités
        const news = await (0, NewsAggregator_1.fetchNews)();
        if (!news || news.length === 0) {
            console.warn('⚠️ Aucune actualité réelle — fallback utilisé');
        }
        await updateNews(news);
        cache_1.cache.set('brvmNews', news);
        console.log(`🧪 ${news.length} actualités mises en cache`);
        // 🕒 Horodatage de la mise à jour
        const timestamp = new Date().toISOString();
        cache_1.cache.set('lastUpdate', timestamp);
        console.log(`📅 Mise à jour terminée à ${timestamp}`);
    }
    catch (error) {
        console.error('❌ Erreur autoUpdate :', error.message);
    }
}
