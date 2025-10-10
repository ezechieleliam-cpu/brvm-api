import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  change: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

stockSchema.index({ symbol: 1 });

export const StockModel = mongoose.models.Stock || mongoose.model('Stock', stockSchema);