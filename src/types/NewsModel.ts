import { cache } from "../utils/cache";

export interface INews {
  title: string;
  source: string;
  url: string;
  html: string;
  date: Date;
}
import mongoose from 'mongoose';

export interface INews {
  title: string;
  source: string;
  url: string;
  html: string;
  date: Date;
}

const newsSchema = new mongoose.Schema<INews>({
  title: { type: String, required: true },
  source: { type: String, required: true },
  url: { type: String, required: true },
  html: { type: String, required: true },
  date: {
    type: Date,
    required: true,
    default: () => new Date()
  }
});

const NewsModel = mongoose.model<INews>('News', newsSchema);
export default NewsModel;
