"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BRVMScraper_1 = require("../services/BRVMScraper");
const NewsAggregator_1 = require("../NewsAggregator");
const router = (0, express_1.Router)();
/**
 * @openapi
 * /api/brvm:
 *   get:
 *     summary: Récupère les cours BRVM depuis plusieurs sources
 *     tags:
 *       - Cours BRVM
 *     responses:
 *       200:
 *         description: Liste consolidée des actions cotées
 */
router.get('/brvm', async (req, res) => {
    try {
        const data = [
            ...await (0, BRVMScraper_1.scrapeBRVM)(),
            ...await (0, BRVMScraper_1.scrapeRichBourse)()
        ];
        res.json(data);
    }
    catch (error) {
        console.error('❌ Erreur /api/brvm :', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});
/**
 * @openapi
 * /api/news:
 *   get:
 *     summary: Actualités financières du marché
 *     tags:
 *       - Actualités
 *     responses:
 *       200:
 *         description: Liste des actualités financières
 */
router.get('/news', async (req, res) => {
    try {
        const news = await (0, NewsAggregator_1.fetchNews)();
        res.json(news);
    }
    catch (error) {
        console.error('❌ Erreur /api/news :', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});
exports.default = router;
