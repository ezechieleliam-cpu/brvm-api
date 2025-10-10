import News, { INews } from '../models/NewsModel.js';

export async function saveNews(news: INews[]) {
  await News.deleteMany({});
  await News.insertMany(news);

}
