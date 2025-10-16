import axios from 'axios';
import { cache } from "../utils/cache";
import cheerio from 'cheerio';
import { config } from 'dotenv';
config();

import https from 'https'; // ajoute en haut du fichier

const agent = new https.Agent({ rejectUnauthorized: false });

const res = await axios.get(process.env.BRVM_URL!, {
  headers: { 'User-Agent': 'Mozilla/5.0' },
  timeout: 15000,
  httpsAgent: agent // ✅ ajoute cette ligne
});


export interface StockData {
  symbole: string;
  variation: number;
  cours: number;
}

/**
 * 🔍 Scrape les données du site officiel BRVM
 */
export async function scrapeBRVMFromBRVM(): Promise<StockData[]> {
  try {
    const res = await axios.get(process.env.BRVM_URL!, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 15000
    });

    const $ = cheerio.load(res.data);
    const rows = $('table tbody tr');
    const data: StockData[] = [];

    rows.each((_, row) => {
      const cells = $(row).find('td');

      const symbole = $(cells[0]).text().trim();
      const coursText = $(cells[1]).text().trim().replace(',', '.');
      const variationText = $(cells[2]).text().trim().replace(',', '.');

      const cours = parseFloat(coursText);
      const variation = parseFloat(variationText);

      if (symbole && !isNaN(cours) && !isNaN(variation)) {
        data.push({ symbole, cours, variation });
      }
    });

    return data;
  } catch (error) {
    console.error('❌ BRVM Error:', (error as Error).message);
    return [];
  }
}

/**
 * 🔍 Scrape les données du site RichBourse
 */
export async function scrapeRichBourse(): Promise<StockData[]> {
  try {
    const res = await axios.get(process.env.RICHBOURSE_URL!, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 15000
    });

    const $ = cheerio.load(res.data);
    const rows = $('table tbody tr');
    const data: StockData[] = [];

    rows.each((_, row) => {
      const cells = $(row).find('td');

      const symbole = $(cells[0]).text().trim();
      const coursText = $(cells[1]).text().trim().replace(',', '.');
      const variationText = $(cells[2]).text().trim().replace(',', '.');

      const cours = parseFloat(coursText);
      const variation = parseFloat(variationText);

      if (symbole && !isNaN(cours) && !isNaN(variation)) {
        data.push({ symbole, cours, variation });
      }
    });

    return data;
  } catch (error) {
    console.error('❌ RichBourse Error:', (error as Error).message);
    return [];
  }
}
