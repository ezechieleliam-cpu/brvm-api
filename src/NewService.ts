import { NewsModel } from './models/NewsModel'; // adapte le chemin si nécessaire
import { INews } from './types/News'; // ou le type que tu utilises
import mongoose from 'mongoose';

export async function saveNews(news: INews[]) {
  await NewsModel.deleteMany({});
  await NewsModel.insertMany(news);
}

export interface INews extends mongoose.Document {
  source: string;
  title: string;
  html: string;
  date: Date;
}

const NewsSchema = new mongoose.Schema<INews>({
  source: { type: String, required: true },
  title: { type: String, required: true },
  html: { type: String, required: true },
  date: { type: Date, required: true },
});

export const NewsModel = mongoose.model<INews>('News', NewsSchema);
