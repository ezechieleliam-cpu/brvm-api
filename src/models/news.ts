import mongoose, { Document, Schema } from 'mongoose';

interface INews extends Document {
  title: string;
  content: string;
  date: Date;
}

const newsSchema = new mongoose.Schema({
  title: String,
  content: String,
  source: String,
  timestamp: Date,
});

export const News = mongoose.model("News", newsSchema);

export default News;
