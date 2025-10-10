import express, { Request, Response } from 'express';
import { StockModel } from '../models/Stock'; 

const router = express.Router();

/**
 * @openapi
 * /api/history:
 *   get:
 *     summary: Retourne l'historique des cours BRVM avec pagination
 *     tags:
 *       - Historique
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Numéro de page (par défaut 1)
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Nombre d'éléments par page (par défaut 10)
 *     responses:
 *       200:
 *         description: Historique paginé des cours BRVM
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalItems:
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
 *                       date:
 *                         type: string
 *                         format: date-time
 */
router.get('/', async (req: Request, res: Response): Promise<void> => {
  const page = Math.max(parseInt(req.query.page as string, 10) || 1, 1);
  const limit = Math.max(parseInt(req.query.limit as string, 10) || 10, 1);

  try {
    const stocks = await StockModel.find()
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await StockModel.countDocuments();

    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      data: stocks
    });
  } catch (error) {
    console.error('❌ Erreur /api/history :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
