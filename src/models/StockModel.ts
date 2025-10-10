import mongoose from 'mongoose';

export interface IStock {
  symbol: string;
  name: string;
  price: number;
  variation: number;
  date: Date;
}

const stockSchema = new mongoose.Schema<IStock>({
  symbol: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  variation: { type: Number, required: true },
  date: { type: Date, required: true }
});

const Stock = mongoose.model<IStock>('Stock', stockSchema);
export default Stock; // ✅ export par défaut
