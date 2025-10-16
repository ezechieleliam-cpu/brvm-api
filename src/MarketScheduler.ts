import { cache } from "./utils/cache.js";
import StockModel from "./models/StockModel.js";

export function isMarketOpen(): boolean {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay();
  return day >= 1 && day <= 5 && hour >= 9 && hour <= 15;
}
