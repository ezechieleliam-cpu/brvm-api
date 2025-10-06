"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AutoUpdater_1 = require("./services/AutoUpdater");
var cache_1 = require("./cache");
dotenv.config();
var swagger_ui_express_1 = require("swagger-ui-express");
var swagger_jsdoc_1 = require("swagger-jsdoc");
var swaggerSpec = (0, swagger_jsdoc_1.default)({
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
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
app.get('/api/brvm', function (req, res) {
    res.json(cache_1.cache.get('brvmData') || []);
});
app.get('/api/news', function (req, res) {
    res.json(cache_1.cache.get('brvmNews') || []);
});
app.listen(PORT, function () {
    console.log("\u2705 API BRVM en ligne sur http://localhost:".concat(PORT));
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
