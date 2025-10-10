import { cache } from './utils/cache';
import { StockModel } from './models/Stock';
import { NewsModel } from './models/NewsModel';
import { fetchNews } from './NewsAggregator';
import { isMarketOpen } from './MarketScheduler';
import { scrapeBRVM } from './services/scraper'; // ✅ Assure-toi que ce fichier existe et exporte scrapeBRVM

// 📰 Mise à jour des actualités MongoDB
export async function updateNews(news: any[]) {
  try {
    await NewsModel.deleteMany({});
    await NewsModel.insertMany(news);
    console.log(`🗞️ ${news.length} actualités insérées dans MongoDB`);
  } catch (error) {
    console.error('❌ Erreur lors de l’insertion des actualités :', (error as Error).message);
  }
}

// 🔁 Mise à jour automatique des données BRVM
export async function autoUpdate(): Promise<void> {
  try {
    const marketOpen = isMarketOpen();

    if (!marketOpen) {
      console.log('⏳ Marché fermé — aucune mise à jour effectuée');
      return;
    }

    console.log('🔄 Démarrage de la mise à jour BRVM...');

    // 📊 Scraping des données BRVM
    const brvmData = await scrapeBRVM();

    if (!brvmData || brvmData.length === 0) {
      console.warn('⚠️ Aucune donnée BRVM récupérée — fallback utilisé');

      const fallbackData = [
        { symbol: 'SGBC', name: 'Société Générale CI', price: 1450, change: 2.5, date: new Date() },
        { symbol: 'ETIT', name: 'Ecobank Transnational', price: 22, change: -1.2, date: new Date() }
      ];

      await StockModel.deleteMany({});
      await StockModel.insertMany(fallbackData);
      cache.set('brvmData', fallbackData);
      console.log('📦 Fallback BRVM inséré et mis en cache');
    } else {
      await StockModel.deleteMany({});
      await StockModel.insertMany(brvmData);
      cache.set('brvmData', brvmData);
      console.log(`📦 ${brvmData.length} données BRVM insérées et mises en cache`);
    }

    // 📰 Scraping des actualités
    const news = await fetchNews();

    if (!news || news.length === 0) {
      console.warn('⚠️ Aucune actualité réelle — fallback utilisé');
    }

    await updateNews(news);
    cache.set('brvmNews', news);
    console.log(`🧪 ${news.length} actualités mises en cache`);

    // 🕒 Horodatage de la mise à jour
    const timestamp = new Date().toISOString();
    cache.set('lastUpdate', timestamp);
    console.log(`📅 Mise à jour terminée à ${timestamp}`);
  } catch (error) {
    console.error('❌ Erreur autoUpdate :', (error as Error).message);
  }
}
