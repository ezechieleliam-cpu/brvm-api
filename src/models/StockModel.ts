import mongoose from "mongoose";

export interface IStock {
  symbol: string;
  name: string;
  price: number;
  variation: number;
  date: Date;
}

const stockSchema = new mongoose.Schema({
  symbole: String,
  variation: Number,
  cours: Number,
  timestamp: Date,
});

const StockModel = mongoose.model("Stock", stockSchema);
export default StockModel;
