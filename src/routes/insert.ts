import express, { Request, Response } from 'express';
import { StockModel } from '../models/Stock'; 

const router = express.Router();

/**
 * @openapi
 * /api/insert:
 *   post:
 *     summary: Insère un lot de données fictives dans MongoDB
 *     tags:
 *       - Insertion
 *     responses:
 *       201:
 *         description: Données insérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       symbol:
 *                         type: string
 *                       name:
 *                         type: string
 *                       price:
 *                         type: number
 *                       change:
 *                         type: number
 */
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const sampleData = [
      { symbol: 'SGBC', name: 'Société Générale CI', price: 1450, change: 2.5 },
      { symbol: 'ETIT', name: 'Ecobank Transnational', price: 22, change: -1.2 },
      { symbol: 'BOAB', name: 'Bank of Africa', price: 520, change: 0.0 }
    ];

    const inserted = await StockModel.insertMany(sampleData);

    res.status(201).json({
      message: '✅ Données insérées avec succès',
      count: inserted.length,
      data: inserted
    });
  } catch (error) {
    console.error('❌ Erreur /api/insert :', error);
    res.status(500).json({ error: 'Erreur serveur lors de l’insertion' });
  }
});

export default router;
