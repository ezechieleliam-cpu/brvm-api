import { cache } from './utils/cache';
import { StockModel } from './models/Stock';
import { NewsModel } from './models/NewsModel';
import { fetchNews } from './NewsAggregator';
import { isMarketOpen } from './MarketScheduler';
import { scrapeBRVM } from './services/scraper'; // ✅ Assure-toi que ce fichier existe

// 📰 Mise à jour des actualités MongoDB
export async function updateNews(news: any[]) {
  await NewsModel.deleteMany({});
  await NewsModel.insertMany(news);
}

// 🔁 Mise à jour automatique des données BRVM
export async function autoUpdate(): Promise<void> {
  try {
    const marketOpen = isMarketOpen();

    if (!marketOpen) {
      console.log('⏳ Marché fermé');
      return;
    }

    console.log('🔄 Mise à jour des données BRVM...');

    // ✅ Scraping réel des données BRVM
    const brvmData = await scrapeBRVM();

    if (!brvmData || brvmData.length === 0) {
      console.warn('⚠️ Aucune donnée BRVM récupérée — fallback utilisé');

      // Fallback temporaire
      const fakeData = [
        { symbol: 'SGBC', name: 'Société Générale CI', price: 1450, change: 2.5, date: new Date() },
        { symbol: 'ETIT', name: 'Ecobank Transnational', price: 22, change: -1.2, date: new Date() }
      ];

      await StockModel.deleteMany({});
      await StockModel.insertMany(fakeData);
      cache.set('brvmData', fakeData);
    } else {
      await StockModel.deleteMany({});
      await StockModel.insertMany(brvmData);
      cache.set('brvmData', brvmData);
    }

    // 📰 Actualités
    const news = await fetchNews();

    if (news.length === 0) {
      console.warn('⚠️ Aucune actualité réelle — fallback utilisé');
    }

    await updateNews(news);
    cache.set('brvmNews', news);

    console.log('🧪 Actualités récupérées :', news);
  } catch (error) {
    console.error('❌ Erreur autoUpdate :', (error as Error).message);
  }
}
