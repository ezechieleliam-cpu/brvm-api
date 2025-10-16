import axios from "axios";
import { cache } from "./utils/cache.js";
import NewsModel from "./models/NewsModel.js";
import * as cheerio from "cheerio";
import mongoose from "mongoose";

export interface NewsItem {
  source: string;
  title: string;
  html: string;
  date: Date;
}

export async function fetchNews(): Promise<NewsItem[]> {
  const urls = [
    "https://www.sikafinance.com/marches/actualites_bourse_brvm",
    "https://www.sikafinance.com/marches/communiques_brvm",
    "https://www.richbourse.com/common/actualite/index",
  ];

  const news: NewsItem[] = [];

  for (const url of urls) {
    try {
      const res = await axios.get(url, {
        headers: { "User-Agent": "Mozilla/5.0" },
        timeout: 15000,
      });

      const $ = cheerio.load(res.data);

      if (url.includes("sikafinance")) {
        $(".bloc-actu .title a").each((_, el) => {
          const title = $(el).text().trim();
          const html = $.html(el);
          if (title) {
            news.push({
              source: "Sikafinance",
              title,
              html,
              date: new Date(),
            });
          }
        });
      }

      if (url.includes("richbourse")) {
        $(".card-title a").each((_, el) => {
          const title = $(el).text().trim();
          const html = $.html(el);
          if (title) {
            news.push({
              source: "RichBourse",
              title,
              html,
              date: new Date(),
            });
          }
        });
      }
    } catch (error) {
      console.warn(`⚠️ Erreur actualités ${url}:`, (error as Error).message);
    }
  }

  if (news.length === 0) {
    console.warn("⚠️ Aucune actualité récupérée — fallback utilisé");
    news.push(
      {
        source: "Ecofin",
        title: "BRVM monte",
        html: "<p>Actualité fictive du 2025-10-06</p>",
        date: new Date("2025-10-06"),
      },
      {
        source: "Jeune Afrique",
        title: "SIB CI performe",
        html: "<p>Actualité fictive du 2025-10-05</p>",
        date: new Date("2025-10-05"),
      }
    );
  } else {
    console.log(`✅ ${news.length} actualités récupérées`);
  }

  

if (mongoose.connection.readyState === 1) {
  await NewsModel.insertMany(news);
} else {
  console.warn("⚠️ MongoDB non connecté — insertion ignorée");
}

  return news;
}
