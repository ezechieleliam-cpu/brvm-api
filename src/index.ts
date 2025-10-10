import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { autoUpdate } from './AutoUpdater';
import { cache } from './utils/cache';
import { setupSwagger } from './swagger';

import brvmRoutes from './routes/brvm';
import historyRoute from './routes/history';
import insertRoute from './routes/insert';
import scrapeRoute from './routes/scrape';
import newsRoute from './routes/news';


dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// 🧠 Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI!, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log('✅ Connexion MongoDB réussie'))
  .catch((err) => console.error('❌ Erreur MongoDB :', err));

// 📚 Swagger UI
setupSwagger(app);

// 📦 Middleware JSON
app.use(express.json());

// 📦 Routes API
app.use('/api/history', historyRoute);
app.use('/api/insert', insertRoute);
app.use('/api/scrape', scrapeRoute);
app.use('/api/brvm', brvmRoutes);
app.use('/api/news', newsRoute);

app.get('/ping', (req, res) => res.send('pong'));

// 📊 Routes en cache
app.get('/api/brvm', (req, res) => {
  res.json(cache.get('brvmData') || []);
});

app.get('/api/news', (req, res) => {
  res.json(cache.get('brvmNews') || []);
});

// 🔁 Ping de test
app.get('/ping', (req, res) => {
  res.send('pong');
});

// 🚀 Lancement du serveur
app.listen(PORT, () => {
  console.log(`✅ API BRVM en ligne sur http://localhost:${PORT}`);
});

