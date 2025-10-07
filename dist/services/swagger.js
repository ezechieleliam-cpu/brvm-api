"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: '📈 BRVM API',
            version: '1.0.0',
            description: 'API pour les cours BRVM et les actualités financières'
        },
        servers: [
            {
                url: 'https://brvm-api-1-hif3.onrender.com',
                description: 'Render Deployment'
            },
            {
                url: 'http://localhost:3000',
                description: 'Local Development'
            }
        ]
    },
    apis: ['./src/routes/*.ts']
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
function setupSwagger(app) {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
}
