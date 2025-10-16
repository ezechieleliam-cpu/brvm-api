import express from "express";
import NewsModel from "../models/NewsModel.js"; // ✅
import { cache } from "../utils/cache.js";

export const news = express.Router();
export const stock = express.Router();


news.get("/", async (_, res) => {
  try {
    const newsItems = await NewsModel.find().sort({ publishedAt: -1 }).limit(20);
    res.json(newsItems);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des actualités." });
  }
});
