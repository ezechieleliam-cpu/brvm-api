import axios from 'axios';
import { cache } from '../cache';
import { config } from 'dotenv';
config();

export async function scrapeBRVM(): Promise<any[]> {
  try {
    const res = await axios.get(process.env.BRVM_URL!, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 15000
    });
    return parseMockBRVM(); // à remplacer par cheerio plus tard
  } catch (error) {
    console.error('❌ BRVM Error:', error.message);
    return [];
  }
}

export async function scrapeRichBourse(): Promise<any[]> {
  try {
    const res = await axios.get(process.env.RICHBOURSE_URL!, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 15000
    });
    return parseMockRichBourse();
  } catch (error) {
    console.error('❌ RichBourse Error:', error.message);
    return [];
  }
}

function parseMockBRVM() {
  return [
    { symbole: 'PALC', variation: 2.8, cours: 9245 },
    { symbole: 'SOGC', variation: 1.5, cours: 8420 }
  ];
}

function parseMockRichBourse() {
  return [
    { symbole: 'PALC', variation: 2.9, cours: 9250 },
    { symbole: 'SOGC', variation: 1.4, cours: 8415 }
  ];
}
