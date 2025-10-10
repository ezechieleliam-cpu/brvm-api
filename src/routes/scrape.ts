import express from 'express';
import { autoUpdate } from '../AutoUpdater';
import { cache } from '../utils/cache';

const router = express.Router();

/**
 * @openapi
 * /api/scrape:
 *   post:
 *     summary: Déclenche une mise à jour complète des données BRVM et des actualités
 *     tags:
 *       - Scraping
 *     responses:
 *       200:
 *         description: Mise à jour réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ✅ Mise à jour BRVM déclenchée
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: ❌ Erreur lors du scraping
 */
router.post('/', async (_, res) => {
  try {
    await autoUpdate();
    res.status(200).json({ message: '✅ Mise à jour BRVM déclenchée' });
  } catch (error) {
    console.error('❌ Erreur /api/scrape :', error);
    res.status(500).json({ error: '❌ Erreur lors du scraping' });
  }
});

/**
 * @openapi
 * /api/scrape/status:
 *   get:
 *     summary: Vérifie le statut actuel du cache BRVM et des actualités
 *     tags:
 *       - Scraping
 *     responses:
 *       200:
 *         description: Statut du cache
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 brvmCount:
 *                   type: number
 *                 newsCount:
 *                   type: number
 */
router.get('/status', (_, res) => {
  const brvmData = cache.get('brvmData') || [];
  const brvmNews = cache.get('brvmNews') || [];

  res.json({
    brvmCount: brvmData.length,
    newsCount: brvmNews.length
  });
});

export default router;
