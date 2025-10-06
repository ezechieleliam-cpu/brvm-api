import mongoose from 'mongoose';
import { StockModel } from '../models/Stock';

const stockSchema = new mongoose.Schema({
  symbole: String,
  variation: Number,
  cours: Number,
  source: String,
  timestamp: Date
});

export const StockModel = mongoose.model('Stock', stockSchema);
