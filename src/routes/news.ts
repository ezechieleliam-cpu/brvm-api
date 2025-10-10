import express from 'express';
import { NewsModel } from '../models/NewsModel'

const router = express.Router();

router.get('/', async (_, res) => {
  const news = await NewsModel.find().sort({ date: -1 }).limit(10);
  res.json(news);
});

export default router;
