import express from "express";
import { cache } from "../utils/cache.js";

export const monitoring = express.Router();

monitoring.get("/", (_, res) => {
  const brvmData = cache.get("brvmData") || [];
  const brvmNews = cache.get("brvmNews") || [];
  const lastUpdate = cache.get("lastUpdate") || null;
  const logs = cache.get("updateLogs") || [];

  res.json({
    brvmCount: brvmData.length,
    newsCount: brvmNews.length,
    lastUpdate,
    logs: logs.slice(-10),
  });
});
