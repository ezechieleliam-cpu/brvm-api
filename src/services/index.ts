import express from 'express';
import { autoUpdate } from './AutoUpdater';
import { cache } from '../utils/cache';
import dotenv from 'dotenv';
dotenv.config();

import brvmRoutes from '../routes/brvm';
import { setupSwagger } from './swagger';

const app = express();
const PORT = process.env.PORT || 3000;

setupSwagger(app);
app.use('/api', brvmRoutes);

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
