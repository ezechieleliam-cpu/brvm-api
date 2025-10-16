import mongoose from "mongoose";

export interface INews {
  title: string;
  source: string;
  url: string;
  html: string;
  date: Date;
  category?: string;
  sourceLogo?: string;
}

const newsSchema = new mongoose.Schema({
  title: String,
  source: String,
  url: String,
  publishedAt: Date,
});

const NewsModel = mongoose.model("News", newsSchema);
export default NewsModel;
