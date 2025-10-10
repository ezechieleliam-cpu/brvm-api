import StockModel from '../models/StockModel.js';
import express, { Request, Response } from 'express';

const router = express.Router();

const sampleData = [
  {
    symbol: 'SGBC',
    name: 'Société Générale Cameroun',
    price: 3450,
    variation: 1.2,
    date: new Date()
  },
  {
    symbol: 'BOA',
    name: 'Bank of Africa',
    price: 2850,
    variation: -0.5,
    date: new Date()
  }
];

/**
 * @openapi
 * /api/insert:
 *   post:
 *     summary: Insère un échantillon de données BRVM dans la base MongoDB
 *     tags:
 *       - Insertion
 *     responses:
 *       200:
 *         description: Données insérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 inserted:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Erreur serveur
 */
router.post('/', async (_: Request, res: Response) => { 
  try {
    const inserted = await StockModel.insertMany(sampleData);
    res.json({ inserted });
  } catch (error) {
    console.error('❌ Erreur /api/insert :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/**
 * @openapi
 * /api/insert/sample:
 *   get:
 *     summary: Prévisualise les données d'exemple BRVM sans les insérer
 *     tags:
 *       - Insertion
 *     responses:
 *       200:
 *         description: Données d'exemple
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/sample', (_: Request, res: Response) => {
  res.json(sampleData);
});

export default router;
