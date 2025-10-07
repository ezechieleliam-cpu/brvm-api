"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveStocks = saveStocks;
exports.getStockHistory = getStockHistory;
const Stock_1 = require("../models/Stock");
/**
 * Enregistre un tableau d’actions BRVM dans MongoDB
 */
async function saveStocks(stocks) {
    for (const stock of stocks) {
        await Stock_1.StockModel.findOneAndUpdate({ symbole: stock.symbole }, { ...stock, timestamp: new Date() }, { upsert: true, new: true });
    }
}
/**
 * Récupère les actions enregistrées, triées par date
 */
async function getStockHistory() {
    return Stock_1.StockModel.find().sort({ timestamp: -1 }).limit(100).lean();
}
