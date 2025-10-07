import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  name: String,
  symbol: String,
  price: Number,
  change: Number,
  updatedAt: Date
});

export const StockModel = mongoose.model('Stock', stockSchema);
