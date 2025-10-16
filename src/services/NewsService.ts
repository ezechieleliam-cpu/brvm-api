import News, { INews } from '../models/NewsModel.js';
import { cache } from "../utils/cache";

export async function saveNews(news: INews[]) {
  await News.deleteMany({});
  await News.insertMany(news);

}
