import mongoose from 'mongoose';

export interface INews {
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
