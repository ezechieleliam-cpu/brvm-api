"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AutoUpdater_1 = require("./services/AutoUpdater");
const cache_1 = require("./cache");
dotenv.config();
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerSpec = (0, swagger_jsdoc_1.default)({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'BRVM API',
            version: '1.0.0',
            description: 'API pour les cours BRVM et les actualités financières'
        }
    },
    apis: ['./src/index.ts']
});
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
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
/**
 * @openapi
 * /api/brvm:
 *   get:
 *     summary: Récupère les cours BRVM
 *     responses:
 *       200:
 *         description: Liste des actions
 */
/**
 * @openapi
 * /api/news:
 *   get:
 *     summary: Récupère les actualités financières
 *     responses:
 *       200:
 *         description: Liste des actualités
 */
