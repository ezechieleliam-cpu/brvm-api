import { Router } from 'express';
import { scrapeBRVM, scrapeRichBourse } from '../services/BRVMScraper';
import { fetchNews } from '../services/NewsAggregator';

const router = Router();

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
    ...await scrapeBRVM(),
    ...await scrapeRichBourse()
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
  const news = await fetchNews();
  res.json(news);
});

export default router;
