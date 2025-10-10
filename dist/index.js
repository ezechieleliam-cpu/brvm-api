"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
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
// 📦 Middleware JSON
app.use(express_1.default.json());
// 📚 Swagger UI
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
// 📦 Routes API
app.use('/api/history', history_1.default);
app.use('/api/insert', insert_1.default);
app.use('/api/scrape', scrape_1.default);
app.use('/api/brvm', brvm_1.default);
app.use('/api/news', news_1.default);
// 📊 Routes en cache
app.get('/api/brvm', (_, res) => {
    res.json(cache_1.cache.get('brvmData') || []);
});
app.get('/api/news', (_, res) => {
    res.json(cache_1.cache.get('brvmNews') || []);
});
// 🔁 Ping & Healthcheck
app.get('/ping', (_, res) => res.send('pong'));
app.get('/health', (_, res) => res.send('OK'));
// 🔄 Mise à jour automatique
(0, AutoUpdater_1.autoUpdate)();
setInterval(AutoUpdater_1.autoUpdate, 5 * 60 * 1000); // toutes les 5 minutes
// 🚀 Lancement du serveur
app.listen(PORT, () => {
    console.log(`✅ API BRVM en ligne sur http://localhost:${PORT}`);
});
