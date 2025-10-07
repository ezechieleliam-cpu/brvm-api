"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeBRVM = scrapeBRVM;
exports.scrapeRichBourse = scrapeRichBourse;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
/**
 * Scrape les données du site officiel BRVM
 */
async function scrapeBRVM() {
    try {
        const res = await axios_1.default.get(process.env.BRVM_URL, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            timeout: 15000
        });
        // TODO: remplacer parseMockBRVM() par une vraie extraction avec cheerio
        return parseMockBRVM();
    }
    catch (error) {
        console.error('❌ BRVM Error:', error.message);
        return [];
    }
}
/**
 * Scrape les données du site RichBourse
 */
async function scrapeRichBourse() {
    try {
        const res = await axios_1.default.get(process.env.RICHBOURSE_URL, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            timeout: 15000
        });
        // TODO: remplacer parseMockRichBourse() par une vraie extraction avec cheerio
        return parseMockRichBourse();
    }
    catch (error) {
        console.error('❌ RichBourse Error:', error.message);
        return [];
    }
}
/**
 * Données fictives BRVM pour test
 */
function parseMockBRVM() {
    return [
        { symbole: 'PALC', variation: 2.8, cours: 9245 },
        { symbole: 'SOGC', variation: 1.5, cours: 8420 }
    ];
}
/**
 * Données fictives RichBourse pour test
 */
function parseMockRichBourse() {
    return [
        { symbole: 'PALC', variation: 2.9, cours: 9250 },
        { symbole: 'SOGC', variation: 1.4, cours: 8415 }
    ];
}
