import * as cheerio from 'cheerio';
const html = '<div><h1>BRVM monte</h1></div>';
const $ = cheerio.load(html);
console.log($('h1').text()); // → BRVM monte
