import { Router } from 'express';
import { scrapeBRVM, scrapeRichBourse } from '../services/BRVMScraper';
import { fetchNews } from '../NewsAggregator';

const router = Router();

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
      ...await scrapeBRVM(),
      ...await scrapeRichBourse()
    ];
    res.json(data);
  } catch (error) {
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
    const news = await fetchNews();
    res.json(news);
  } catch (error) {
    console.error('❌ Erreur /api/news :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
