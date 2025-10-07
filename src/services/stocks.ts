import { StockModel } from '../models/Stock';

/**
 * Enregistre un tableau d’actions BRVM dans MongoDB
 */
export async function saveStocks(stocks: any[]): Promise<void> {
  for (const stock of stocks) {
    await StockModel.findOneAndUpdate(
      { symbole: stock.symbole },
      { ...stock, timestamp: new Date() },
      { upsert: true, new: true }
    );
  }
}

/**
 * Récupère les actions enregistrées, triées par date
 */
export async function getStockHistory(): Promise<any[]> {
  return StockModel.find().sort({ timestamp: -1 }).limit(100).lean();
}
