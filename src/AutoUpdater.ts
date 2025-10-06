import { isMarketOpen } from '../MarketScheduler';
import { scrapeBRVM, scrapeRichBourse } from './BRVMScraper';
import { fetchNews } from '../NewsAggregator';
import { cache } from '../utils/cache';
import mongoose from 'mongoose';
import { StockModel } from '../models/Stock';

mongoose.connect(process.env.MONGO_URI!);

export async function autoUpdate() {
  if (!isMarketOpen()) {
    console.log('⏳ Marché fermé');
    return;
  }

  console.log('🚀 Mise à jour en cours...');

  const brvmData = [...await scrapeBRVM(), ...await scrapeRichBourse()];
  const newsData = await fetchNews();

  cache.set('brvmData', brvmData);
  cache.set('brvmNews', newsData);

  try {
    for (const stock of brvmData) {
      await StockModel.create({ ...stock, timestamp: new Date() });
    }
    console.log(`✅ ${brvmData.length} actions historisées dans MongoDB`);
  } catch (error) {
    console.error('❌ Erreur MongoDB :', error instanceof Error ? error.message : error);
  }
}
