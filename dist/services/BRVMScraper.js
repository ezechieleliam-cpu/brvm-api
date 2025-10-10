"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeBRVM = scrapeBRVM;
exports.scrapeRichBourse = scrapeRichBourse;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
/**
 * 🔍 Scrape les données du site officiel BRVM
 */
async function scrapeBRVM() {
    try {
        const res = await axios_1.default.get(process.env.BRVM_URL, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            timeout: 15000
        });
        const $ = cheerio_1.default.load(res.data);
        const rows = $('table tbody tr');
        const data = [];
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
    }
    catch (error) {
        console.error('❌ BRVM Error:', error.message);
        return [];
    }
}
/**
 * 🔍 Scrape les données du site RichBourse
 */
async function scrapeRichBourse() {
    try {
        const res = await axios_1.default.get(process.env.RICHBOURSE_URL, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            timeout: 15000
        });
        const $ = cheerio_1.default.load(res.data);
        const rows = $('table tbody tr');
        const data = [];
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
    }
    catch (error) {
        console.error('❌ RichBourse Error:', error.message);
        return [];
    }
}
