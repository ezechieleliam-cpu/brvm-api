"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const AutoUpdater_1 = require("./AutoUpdater");
const cache_1 = require("./utils/cache");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./swagger"));
const brvm_1 = __importDefault(require("./routes/brvm"));
const history_1 = __importDefault(require("./routes/history"));
const insert_1 = __importDefault(require("./routes/insert"));
const scrape_1 = __importDefault(require("./routes/scrape"));
const news_1 = __importDefault(require("./routes/news"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3000;
// 🧠 Connexion à MongoDB
mongoose_1.default.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
    .then(() => console.log('✅ Connexion MongoDB réussie'))
    .catch((err) => console.error('❌ Erreur MongoDB :', err));
// 🌐 Middleware CORS + JSON
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// 📚 Swagger UI
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
// 📦 Routes API
app.use('/api/history', history_1.default);
app.use('/api/insert', insert_1.default);
app.use('/api/scrape', scrape_1.default);
app.use('/api/brvm', brvm_1.default);
app.use('/api/news', news_1.default);
// 📊 Routes en cache (lecture rapide)
app.get('/api/brvm', (_, res) => {
    res.json(cache_1.cache.get('brvmData') || []);
});
app.get('/api/news', (_, res) => {
    res.json(cache_1.cache.get('brvmNews') || []);
});
// 📈 Statut du cache
app.get('/api/status', (_, res) => {
    const brvmData = cache_1.cache.get('brvmData') || [];
    const brvmNews = cache_1.cache.get('brvmNews') || [];
    const lastUpdate = cache_1.cache.get('lastUpdate') || null;
    res.json({
        brvmCount: brvmData.length,
        newsCount: brvmNews.length,
        lastUpdate
    });
});
// 🧾 Logs de mise à jour (mocké pour extension future)
app.get('/api/logs', (_, res) => {
    const logs = cache_1.cache.get('updateLogs') || [];
    res.json(logs.slice(-10)); // les 10 derniers
});
// 🔁 Ping & Healthcheck
app.get('/ping', (_, res) => res.send('pong'));
app.get('/health', (_, res) => res.send('OK'));
// 🔄 Mise à jour automatique au démarrage + toutes les 5 minutes
(0, AutoUpdater_1.autoUpdate)();
setInterval(() => {
    (0, AutoUpdater_1.autoUpdate)();
    cache_1.cache.set('lastUpdate', new Date().toISOString());
    // Historique des mises à jour (mock)
    const logs = cache_1.cache.get('updateLogs') || [];
    logs.push({ time: new Date().toISOString(), status: 'OK' });
    cache_1.cache.set('updateLogs', logs);
}, 5 * 60 * 1000);
// 🚀 Lancement du serveur
app.listen(PORT, () => {
    console.log(`✅ API BRVM en ligne sur port ${PORT} [env: ${process.env.NODE_ENV || 'dev'}]`);
});
