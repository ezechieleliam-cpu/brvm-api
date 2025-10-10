import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { autoUpdate } from './AutoUpdater';
import { cache } from './utils/cache';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger';

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

// 📦 Middleware JSON
app.use(express.json());

// 📚 Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 📦 Routes API
app.use('/api/history', historyRoute);
app.use('/api/insert', insertRoute);
app.use('/api/scrape', scrapeRoute);
app.use('/api/brvm', brvmRoutes);
app.use('/api/news', newsRoute);

// 📊 Routes en cache
app.get('/api/brvm', (_, res) => {
  res.json(cache.get('brvmData') || []);
});

app.get('/api/news', (_, res) => {
  res.json(cache.get('brvmNews') || []);
});

// 🔁 Ping & Healthcheck
app.get('/ping', (_, res) => res.send('pong'));
app.get('/health', (_, res) => res.send('OK'));

// 🔄 Mise à jour automatique
autoUpdate();
setInterval(autoUpdate, 5 * 60 * 1000); // toutes les 5 minutes

// 🚀 Lancement du serveur
app.listen(PORT, () => {
  console.log(`✅ API BRVM en ligne sur http://localhost:${PORT}`);
});
