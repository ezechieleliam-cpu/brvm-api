import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  symbole: String,
  variation: Number,
  cours: Number,
  timestamp: Date,
});

export const StockModel = mongoose.model("Stock", stockSchema);
