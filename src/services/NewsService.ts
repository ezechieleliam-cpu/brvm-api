import { NewsModel, INews } from '../models/NewsModel';

export async function saveNews(news: INews[]) {
  await NewsModel.deleteMany({});
  await NewsModel.insertMany(news);
}
