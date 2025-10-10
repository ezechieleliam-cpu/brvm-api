import StockModel from '../models/StockModel.js';
import express, { Request, Response } from 'express';

const router = express.Router();

/**
 * @openapi
 * /api/history/all:
 *   get:
 *     summary: Récupère les 100 dernières entrées BRVM triées par date
 *     tags:
 *       - Historique
 *     responses:
 *       200:
 *         description: Liste des données BRVM
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                 stocks:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Erreur serveur
 */
router.get('/all', async (_: Request, res: Response) => { 
  try {
    const stocks = await StockModel.find().sort({ date: -1 }).limit(100);
    const total = await StockModel.countDocuments();
    res.json({ total, stocks });
  } catch (error) {
    console.error('❌ Erreur /api/history/all :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/**
 * @openapi
 * /api/history/latest:
 *   get:
 *     summary: Récupère la dernière entrée BRVM enregistrée
 *     tags:
 *       - Historique
 *     responses:
 *       200:
 *         description: Dernière donnée BRVM
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Erreur serveur
 */
router.get('/latest', async (_: Request, res: Response) => {
  try {
    const latest = await StockModel.findOne().sort({ date: -1 });
    res.json({ latest });
  } catch (error) {
    console.error('❌ Erreur /api/history/latest :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
