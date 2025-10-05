import { isMarketOpen } from './MarketScheduler';
import { scrapeBRVM, scrapeRichBourse } from './BRVMScraper';
import { fetchNews } from './NewsAggregator';
import { cache } from '../cache';

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
}
