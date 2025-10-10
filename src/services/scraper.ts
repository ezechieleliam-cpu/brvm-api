import puppeteer from 'puppeteer';
import { scrapeBRVMFromBRVM, scrapeRichBourse } from './BRVMScraper';

export async function scrapeBRVM() {
  const dataA = await scrapeBRVMFromBRVM();
  const dataB = await scrapeRichBourse();
  return [...dataA, ...dataB];
}

export async function scrapeBrvmTable() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.brvm.org/fr/cours-actions/0', { waitUntil: 'networkidle2' });

  const data = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('table tbody tr'));
    return rows.map(row => {
      const cells = row.querySelectorAll('td');
      return {
        symbole: cells[0]?.innerText.trim(),
        nom: cells[1]?.innerText.trim(),
        volume: cells[2]?.innerText.trim(),
        veille: cells[3]?.innerText.trim(),
        ouverture: cells[4]?.innerText.trim(),
        cloture: cells[5]?.innerText.trim(),
        variation: cells[6]?.innerText.trim()
      };
    });
  });

  await browser.close();
  return data;
}
