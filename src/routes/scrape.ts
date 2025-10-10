import express, { Request, Response } from 'express';
import { scrapeBRVM } from '../services/BRVMScraper';
import { autoUpdate } from '../AutoUpdater';

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

router.post('/', async (_, res) => {
  try {
    await autoUpdate();
    res.status(200).json({ message: '✅ Mise à jour BRVM déclenchée' });
  } catch (error) {
    res.status(500).json({ error: '❌ Erreur lors du scraping' });
  }
});

export default router;