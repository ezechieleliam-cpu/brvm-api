import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { autoUpdate } from './AutoUpdater.js'; // ✅ extension .js requise en ES modules
import { cache } from './utils/cache.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.js';
import newsRoute from './routes/news.js';
import brvmRoutes from './routes/brvm.js';
import historyRoute from './routes/history.js';
import insertRoute from './routes/insert.js';
import scrapeRoute from './routes/scrape.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
// 🧠 Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`);
    });
})
    .catch(err => {
    console.error('❌ MongoDB connection error:', err);
});
// 🌐 Middleware CORS + JSON
app.use(cors());
app.use(express.json());
// 📚 Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// 📦 Routes API
app.use('/api/history', historyRoute);
app.use('/api/insert', insertRoute);
app.use('/api/scrape', scrapeRoute);
app.use('/api/brvm', brvmRoutes);
app.use(express.json());
app.use('/api/news', newsRoute);
app.use('/api/stocks', brvmRoutes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// 📊 Routes en cache (lecture rapide)
app.get('/api/brvm', (_, res) => {
    res.json(cache.get('brvmData') || []);
});
app.get('/api/news', (_, res) => {
    res.json(cache.get('brvmNews') || []);
});
// 📈 Statut du cache
app.get('/api/status', (_, res) => {
    const brvmData = cache.get('brvmData') || [];
    const brvmNews = cache.get('brvmNews') || [];
    const lastUpdate = cache.get('lastUpdate') || null;
    res.json({
        brvmCount: brvmData.length,
        newsCount: brvmNews.length,
        lastUpdate
    });
});
// 🧾 Logs de mise à jour (mocké pour extension future)
app.get('/api/logs', (_, res) => {
    const logs = cache.get('updateLogs') || [];
    res.json(logs.slice(-10)); // les 10 derniers
});
// 🔁 Ping & Healthcheck
app.get('/ping', (_, res) => res.send('pong'));
app.get('/health', (_, res) => res.send('OK'));
// 🔄 Mise à jour automatique au démarrage + toutes les 5 minutes
autoUpdate();
setInterval(() => {
    autoUpdate();
    cache.set('lastUpdate', new Date().toISOString());
    const logs = cache.get('updateLogs') || [];
    logs.push({ time: new Date().toISOString(), status: 'OK' });
    cache.set('updateLogs', logs);
}, 5 * 60 * 1000);
// 🚀 Lancement du serveur
app.listen(PORT, () => {
    console.log(`✅ API BRVM en ligne sur port ${PORT} [env: ${process.env.NODE_ENV || 'dev'}]`);
});
