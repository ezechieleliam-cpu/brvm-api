import express, { Request, Response } from 'express';
import { scrapeBRVM } from '../services/BRVMScraper';

const router = express.Router();

/**
 * @openapi
 * /api/scrape/scrape-all:
 *   get:
 *     summary: Scrape les données BRVM en direct
 *     tags:
 *       - Scraping
 *     responses:
 *       200:
 *         description: Liste des sociétés cotées avec cours et variation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   symbole:
 *                     type: string
 *                   cours:
 *                     type: number
 *                   variation:
 *                     type: number
 */
router.get('/scrape-all', async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await scrapeBRVM();
    res.json(data);
  } catch (error) {
    console.error('❌ Erreur scraping BRVM :', error);
    res.status(500).json({ error: 'Scraping échoué' });
  }
});

export default router;
