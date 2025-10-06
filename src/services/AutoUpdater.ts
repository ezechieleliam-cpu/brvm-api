import { isMarketOpen } from '../MarketScheduler';
import { scrapeBRVM, scrapeRichBourse } from './BRVMScraper';
import { fetchNews } from '../NewsAggregator';
import { cache } from '../utils/cache';
import mongoose from 'mongoose';
import { StockModel } from '../models/Stock';

mongoose.connect(process.env.MONGO_URI!);

interface StockData {
  symbole: string;
  variation: number;
  cours: number;
}

export async function autoUpdate(): Promise<void> {
  if (!isMarketOpen()) {
    console.log('⏳ Marché fermé');
    return;
  }

  console.log('🚀 Mise à jour en cours...');

  try {
    const brvmData: StockData[] = [
      ...await scrapeBRVM(),
      ...await scrapeRichBourse()
    ];

    const newsData = await fetchNews();

    cache.set('brvmData', brvmData);
    cache.set('brvmNews', newsData);

    for (const stock of brvmData) {
      await StockModel.create({ ...stock, timestamp: new Date() });
    }

    console.log(`✅ ${brvmData.length} actions historisées dans MongoDB`);
  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ Erreur MongoDB :', error.message);
    } else {
      console.error('❌ Erreur inconnue :', error);
    }
  }
}
