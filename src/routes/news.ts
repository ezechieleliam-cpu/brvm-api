import News from '../models/news.js';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const router = express.Router();

mongoose.connection.once('open', async () => {
  try {
    await News.insertMany([
  {
    title: "BRVM Weekly Update",
    content: "The market closed higher this week with gains in banking and telecom sectors.",
    date: new Date(),
  },
  {
    title: "New Listing: ECOBANK Bonds",
    content: "ECOBANK has listed new bonds on the BRVM with a 6.5% yield.",
    date: new Date(),
  }
]);
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
