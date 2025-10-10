"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cache_1 = require("./utils/cache");
const swagger_1 = require("./swagger");
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
// 📚 Swagger UI
(0, swagger_1.setupSwagger)(app);
// 📦 Middleware JSON
app.use(express_1.default.json());
// 📦 Routes API
app.use('/api/history', history_1.default);
app.use('/api/insert', insert_1.default);
app.use('/api/scrape', scrape_1.default);
app.use('/api/brvm', brvm_1.default);
app.use('/api/news', news_1.default);
app.get('/ping', (req, res) => res.send('pong'));
// 📊 Routes en cache
app.get('/api/brvm', (req, res) => {
    res.json(cache_1.cache.get('brvmData') || []);
});
app.get('/api/news', (req, res) => {
    res.json(cache_1.cache.get('brvmNews') || []);
});
// 🔁 Ping de test
app.get('/ping', (req, res) => {
    res.send('pong');
});
// 🚀 Lancement du serveur
app.listen(PORT, () => {
    console.log(`✅ API BRVM en ligne sur http://localhost:${PORT}`);
});
