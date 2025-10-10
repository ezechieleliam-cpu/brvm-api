import { Router } from 'express';
import { scrapeBRVM, scrapeRichBourse } from '../services/BRVMScraper';
import { fetchNews } from '../NewsAggregator';
import { cache } from '../utils/cache';

const router = Router();

/**
 * @openapi
 * /api/brvm/live:
 *   get:
 *     summary: Scrape en direct les cours BRVM depuis plusieurs sources
 *     tags:
 *       - Cours BRVM
 *     responses:
 *       200:
 *         description: Liste consolidée des actions cotées
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   symbol:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   change:
 *                     type: number
 *                   date:
 *                     type: string
 *                     format: date-time
 */
router.get('/live', async (_, res) => {
  try {
    const data = [
      ...await scrapeBRVM(),
      ...await scrapeRichBourse()
    ];
    res.json(data);
  } catch (error) {
    console.error('❌ Erreur /api/brvm/live :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/**
 * @openapi
 * /api/brvm:
 *   get:
 *     summary: Récupère les cours BRVM depuis le cache
 *     tags:
 *       - Cours BRVM
 *     responses:
 *       200:
 *         description: Liste des actions cotées en cache
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   symbol:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   change:
 *                     type: number
 *                   date:
 *                     type: string
 *                     format: date-time
 */
router.get('/', (_, res) => {
  const data = cache.get('brvmData');
  res.json(data || []);
});

/**
 * @openapi
 * /api/brvm/news:
 *   get:
 *     summary: Actualités financières du marché BRVM
 *     tags:
 *       - Actualités
 *     responses:
 *       200:
 *         description: Liste des actualités financières
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   source:
 *                     type: string
 *                   title:
 *                     type: string
 *                   html:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 */
router.get('/news', async (_, res) => {
  try {
    const news = await fetchNews();
    res.json(news);
  } catch (error) {
    console.error('❌ Erreur /api/brvm/news :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/**
 * @openapi
 * /api/brvm/status:
 *   get:
 *     summary: Vérifie le statut du cache BRVM et des actualités
 *     tags:
 *       - Monitoring
 *     responses:
 *       200:
 *         description: Statut du cache BRVM
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 brvmCount:
 *                   type: number
 *                 newsCount:
 *                   type: number
 *                 lastUpdate:
 *                   type: string
 *                   format: date-time
 */
router.get('/status', (_, res) => {
  const brvmData = cache.get('brvmData') || [];
  const brvmNews = cache.get('brvmNews') || [];
  const lastUpdate = cache.get('lastUpdate') || null;

  res.json({
    brvmCount: brvmData.length,
    newsCount: brvmNews.length,
    lastUpdate
  });
});

export default router;
