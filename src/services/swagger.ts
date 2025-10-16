import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { cache } from "../utils/cache";

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

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
