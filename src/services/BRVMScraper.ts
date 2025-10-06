import axios from 'axios';
import { cache } from '../utils/cache';
import { config } from 'dotenv';
config();

interface StockData {
  symbole: string;
  variation: number;
  cours: number;
}

export async function scrapeBRVM(): Promise<StockData[]> {
  try {
    const res = await axios.get(process.env.BRVM_URL!, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 15000
    });

    // TODO: Remplacer par une vraie extraction avec cheerio
    return parseMockBRVM();
  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ BRVM Error:', error.message);
    } else {
      console.error('❌ BRVM Error inconnue:', error);
    }
    return [];
  }
}

export async function scrapeRichBourse(): Promise<StockData[]> {
  try {
    const res = await axios.get(process.env.RICHBOURSE_URL!, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 15000
    });

    // TODO: Remplacer par une vraie extraction avec cheerio
    return parseMockRichBourse();
  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ RichBourse Error:', error.message);
    } else {
      console.error('❌ RichBourse Error inconnue:', error);
    }
    return [];
  }
}

function parseMockBRVM(): StockData[] {
  return [
    { symbole: 'PALC', variation: 2.8, cours: 9245 },
    { symbole: 'SOGC', variation: 1.5, cours: 8420 }
  ];
}

function parseMockRichBourse(): StockData[] {
  return [
    { symbole: 'PALC', variation: 2.9, cours: 9250 },
    { symbole: 'SOGC', variation: 1.4, cours: 8415 }
  ];
}
