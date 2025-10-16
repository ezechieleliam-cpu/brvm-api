// src/AutoUpdater.ts
import { isMarketOpen } from "./MarketScheduler.js";
import { fetchNews } from "./NewsAggregator.js";
import { cache } from "./utils/cache.js";
import { scrapeBRVM, scrapeRichBourse } from "./BRVMScraper.js";
import StockModel from "./models/StockModel.js";
export async function autoUpdate() {
    try {
        if (!isMarketOpen()) {
            console.log("⏳ Marché fermé");
            return;
        }
        console.log("🚀 Mise à jour en cours...");
        const brvmData = [
            ...(await scrapeBRVM()),
            ...(await scrapeRichBourse()),
        ];
        const newsData = await fetchNews();
        cache.set("brvmData", brvmData);
        cache.set("brvmNews", newsData);
        for (const stock of brvmData) {
            await StockModel.create({
                ...stock,
                timestamp: new Date(),
            });
        }
        console.log("✅ Données mises à jour et stockées");
    }
    catch (error) {
        console.error("❌ Erreur dans autoUpdate :", error);
    }
}
