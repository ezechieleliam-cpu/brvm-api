"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoUpdate = autoUpdate;
const MarketScheduler_1 = require("./MarketScheduler");
const BRVMScraper_1 = require("./BRVMScraper");
const NewsAggregator_1 = require("./NewsAggregator");
const cache_1 = require("../utils/cache");
const mongoose_1 = __importDefault(require("mongoose"));
const Stock_1 = require("../models/Stock");
mongoose_1.default.connect(process.env.MONGO_URI);
async function autoUpdate() {
    if (!(0, MarketScheduler_1.isMarketOpen)()) {
        console.log('⏳ Marché fermé');
        return;
    }
    console.log('🚀 Mise à jour en cours...');
    try {
        const brvmData = [
            ...await (0, BRVMScraper_1.scrapeBRVM)(),
            ...await (0, BRVMScraper_1.scrapeRichBourse)()
        ];
        const newsData = await (0, NewsAggregator_1.fetchNews)();
        cache_1.cache.set('brvmData', brvmData);
        cache_1.cache.set('brvmNews', newsData);
        for (const stock of brvmData) {
            await Stock_1.StockModel.create({ ...stock, timestamp: new Date() });
        }
        console.log(`✅ ${brvmData.length} actions historisées dans MongoDB`);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('❌ Erreur MongoDB :', error.message);
        }
        else {
            console.error('❌ Erreur inconnue :', error);
        }
    }
}
