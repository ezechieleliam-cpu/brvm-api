"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AutoUpdater_1 = require("./services/AutoUpdater");
const cache_1 = require("./utils/cache");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const brvm_1 = __importDefault(require("./routes/brvm"));
const swagger_1 = require("./swagger");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
(0, swagger_1.setupSwagger)(app);
app.use('/api', brvm_1.default);
app.get('/api/brvm', (req, res) => {
    res.json(cache_1.cache.get('brvmData') || []);
});
app.get('/api/news', (req, res) => {
    res.json(cache_1.cache.get('brvmNews') || []);
});
app.listen(PORT, () => {
    console.log(`✅ API BRVM en ligne sur http://localhost:${PORT}`);
    (0, AutoUpdater_1.autoUpdate)();
    setInterval(AutoUpdater_1.autoUpdate, 5 * 60 * 1000);
});
