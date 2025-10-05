import express from 'express';
import { autoUpdate } from './services/AutoUpdater';
import { cache } from './cache';
import { config } from 'dotenv';
config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/brvm', (req, res) => {
  res.json(cache.get('brvmData') || []);
});

app.get('/api/news', (req, res) => {
  res.json(cache.get('brvmNews') || []);
});

app.listen(PORT, () => {
  console.log(`✅ API BRVM en ligne sur http://localhost:${PORT}`);
  autoUpdate();
  setInterval(autoUpdate, 5 * 60 * 1000);
});
