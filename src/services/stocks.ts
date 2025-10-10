import StockModel from '../models/StockModel.js';

export async function insertManyStocks(data: any[]) {
  return await StockModel.insertMany(data);
}

export async function getLatestStock() {
  return await StockModel.findOne().sort({ date: -1 });
}
