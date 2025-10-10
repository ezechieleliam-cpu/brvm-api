import News from '../models/NewsModel.js';
import express, { Request, Response } from 'express';


const router = express.Router();

router.get('/', async (_: Request, res: Response) => {
  try {
    const news = await News.find().sort({ date: -1 }).limit(10);
    res.json(news);
  } catch (error) {
    console.error('❌ Erreur /api/news :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
