import express from 'express';
import { autoUpdate } from './services/AutoUpdater';
import { cache } from './cache';
import { config } from 'dotenv';
config();
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerSpec = swaggerJsdoc({
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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/brvm', (req, res) => {
  res.json(cache.get('brvmData') || []);
});

app.get('/api/news', (req, res) => {
  res.json(cache.get('brvmNews') || []);
});

app.listen(PORT, () => {
  console.log(`✅ API BRVM en ligne sur http://localhost:${PORT}`);
  autoUpdate();
  setInterval(autoUpdate, 5 * 60 * 1000);
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
