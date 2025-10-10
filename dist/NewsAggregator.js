"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchNews = fetchNews;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
async function fetchNews() {
    const urls = [
        'https://www.sikafinance.com/marches/actualites_bourse_brvm',
        'https://www.sikafinance.com/marches/communiques_brvm',
        'https://www.sikafinance.com/marches/aaz',
        'https://www.sikafinance.com/applet/graphe_dynamique',
        'https://www.richbourse.com/common/variation/index',
        'https://www.richbourse.com/common/actualite/index',
        'https://www.richbourse.com/common/mouvements/index',
        'https://www.richbourse.com/common/apprendre/articles',
    ];
    const news = [];
    for (const url of urls) {
        try {
            const res = await axios_1.default.get(url, {
                headers: { 'User-Agent': 'Mozilla/5.0' }
            });
            const $ = cheerio.load(res.data);
            if (url.includes('sikafinance')) {
                $('.bloc-actu .title a').each((_, el) => {
                    const title = $(el).text().trim();
                    const html = $.html(el);
                    if (title)
                        news.push({ source: 'Sikafinance', title, html });
                });
            }
            if (url.includes('richbourse')) {
                $('.card-title a').each((_, el) => {
                    const title = $(el).text().trim();
                    const html = $.html(el);
                    if (title)
                        news.push({ source: 'RichBourse', title, html });
                });
            }
        }
        catch (error) {
            console.warn(`⚠️ Erreur actualités ${url}:`, error.message);
        }
    }
    if (news.length === 0) {
        console.warn('⚠️ Aucune actualité récupérée — fallback utilisé');
        news.push({
            source: 'Ecofin',
            title: 'BRVM monte',
            html: '<p>Actualité fictive du 2025-10-06</p>'
        }, {
            source: 'Jeune Afrique',
            title: 'SIB CI performe',
            html: '<p>Actualité fictive du 2025-10-05</p>'
        });
    }
    else {
        console.log(`✅ ${news.length} actualités récupérées`);
    }
    return news;
}
