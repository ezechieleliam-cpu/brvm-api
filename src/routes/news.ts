import News from '../models/news.js';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const router = express.Router();

mongoose.connection.once('open', async () => {
  try {
    await News.insertMany([...]); // ton tableau de news ici
    console.log('✅ News insérées après connexion MongoDB');
  } catch (err) {
    console.error('❌ Erreur insertMany:', err);
  }
});

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
