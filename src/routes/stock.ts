import express from "express";
import StockModel from "../models/StockModel.js";

export const news = express.Router();
export const stock = express.Router();


stock.get("/", async (_, res) => {
  try {
    const stocks = await StockModel.find().sort({ updatedAt: -1 }).limit(50);
    res.json(stocks);
  } catch (error) {
    console.error("❌ Erreur /api/stocks :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des données BRVM." });
  }
});
