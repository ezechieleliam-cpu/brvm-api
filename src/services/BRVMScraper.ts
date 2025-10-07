import axios from 'axios';
import { config } from 'dotenv';
config();

interface StockData {
  symbole: string;
  variation: number;
  cours: number;
}

/**
 * Scrape les données du site officiel BRVM
 */
export async function scrapeBRVM(): Promise<StockData[]> {
  try {
    const res = await axios.get(process.env.BRVM_URL!, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 15000
    });

    // TODO: remplacer parseMockBRVM() par une vraie extraction avec cheerio
    return parseMockBRVM();
  } catch (error) {
    console.error('❌ BRVM Error:', (error as Error).message);
    return [];
  }
}

/**
 * Scrape les données du site RichBourse
 */
export async function scrapeRichBourse(): Promise<StockData[]> {
  try {
    const res = await axios.get(process.env.RICHBOURSE_URL!, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 15000
    });

    // TODO: remplacer parseMockRichBourse() par une vraie extraction avec cheerio
    return parseMockRichBourse();
  } catch (error) {
    console.error('❌ RichBourse Error:', (error as Error).message);
    return [];
  }
}

/**
 * Données fictives BRVM pour test
 */
function parseMockBRVM(): StockData[] {
  return [
    { symbole: 'PALC', variation: 2.8, cours: 9245 },
    { symbole: 'SOGC', variation: 1.5, cours: 8420 }
  ];
}

/**
 * Données fictives RichBourse pour test
 */
function parseMockRichBourse(): StockData[] {
  return [
    { symbole: 'PALC', variation: 2.9, cours: 9250 },
    { symbole: 'SOGC', variation: 1.4, cours: 8415 }
  ];
}
