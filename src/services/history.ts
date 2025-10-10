import express, { Request, Response } from 'express';
import { StockModel } from '../models/Stock'; 

const router = express.Router();

/**
 * GET /api/history
 * Retourne l'historique des cours BRVM avec pagination
 */
router.get('/', async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;

  try {
    // 🔄 Récupère les données triées par date décroissante
    const stocks = await StockModel.find()
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // 📊 Compte total des documents
    const total = await StockModel.countDocuments();

    // ✅ Réponse JSON structurée
    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      data: stocks
    });
  } catch (error) {
    console.error('❌ Erreur /api/history :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
