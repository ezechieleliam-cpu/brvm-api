import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  source: String,
  title: String,
  html: String,
  date: { type: Date, default: Date.now }
});

export const NewsModel = mongoose.models.News || mongoose.model('News', newsSchema);
