import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  symbol: String,
  name: String,
  price: Number,
  change: Number,
  date: Date
});

export const StockModel = mongoose.model('Stock', stockSchema);
