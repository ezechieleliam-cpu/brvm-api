import axios from "axios";
import https from "https";
import { config } from "dotenv";
import { cache } from "./utils/cache.js";

config();

const agent = new https.Agent({ rejectUnauthorized: false });

export interface StockData {
  symbole: string;
  variation: number;
  cours: number;
}

/**
 * 🔍 Scrape les données du site officiel BRVM (mocké)
 */
export async function scrapeBRVM(): Promise<StockData[]> {
  try {
    const res = await axios.get(process.env.BRVM_URL!, {
      headers: { "User-Agent": "Mozilla/5.0" },
      timeout: 15000,
      httpsAgent: agent,
    });

    // TODO: remplacer parseMockBRVM() par cheerio ou puppeteer
    return parseMockBRVM();
  } catch (error) {
    console.error("❌ BRVM Error:", (error as Error).message);
    return [];
  }
}

/**
 * 🔍 Scrape les données du site RichBourse (mocké)
 */
export async function scrapeRichBourse(): Promise<StockData[]> {
  try {
    const res = await axios.get(process.env.RICHBOURSE_URL!, {
      headers: { "User-Agent": "Mozilla/5.0" },
      timeout: 15000,
      httpsAgent: agent,
    });

    // TODO: remplacer parseMockRichBourse() par cheerio ou puppeteer
    return parseMockRichBourse();
  } catch (error) {
    console.error("❌ RichBourse Error:", (error as Error).message);
    return [];
  }
}

/**
 * 🧪 Données fictives BRVM pour test
 */
function parseMockBRVM(): StockData[] {
  return [
    { symbole: "PALC", variation: 2.8, cours: 9245 },
    { symbole: "SOGC", variation: 1.5, cours: 8420 },
  ];
}

function parseMockRichBourse(): StockData[] {
  return [
    { symbole: "PALC", variation: 2.9, cours: 9250 },
    { symbole: "SOGC", variation: 1.4, cours: 8415 },
  ];
}
