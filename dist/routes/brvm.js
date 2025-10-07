"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BRVMScraper_1 = require("../services/BRVMScraper");
const NewsAggregator_1 = require("../services/NewsAggregator");
const router = (0, express_1.Router)();
/**
 * @openapi
 * /api/brvm:
 *   get:
 *     summary: Récupère les cours BRVM
 *     responses:
 *       200:
 *         description: Liste des actions
 */
router.get('/brvm', async (req, res) => {
    const data = [
        ...await (0, BRVMScraper_1.scrapeBRVM)(),
        ...await (0, BRVMScraper_1.scrapeRichBourse)()
    ];
    res.json(data);
});
/**
 * @openapi
 * /api/news:
 *   get:
 *     summary: Actualités financières
 *     responses:
 *       200:
 *         description: Liste des actualités
 */
router.get('/news', async (req, res) => {
    const news = await (0, NewsAggregator_1.fetchNews)();
    res.json(news);
});
exports.default = router;
