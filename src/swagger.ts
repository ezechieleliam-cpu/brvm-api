// ✅ Supprime ces lignes — elles ne sont pas nécessaires ici
// import { news } from "../routes/news.js";
// import { stock } from "../routes/stock.js";

// ✅ Garde uniquement la documentation Swagger
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "📈 BRVM API",
    version: "1.0.0",
    description: "Documentation des endpoints REST pour le marché BRVM",
  },
  servers: [
    {
      url: "https://brvm-api-bi8m.onrender.com",
      description: "Render Deployment",
    },
    {
      url: "http://localhost:3000",
      description: "Local Development",
    },
  ],
  paths: {
    "/ping": {
      get: {
        summary: "Test de vie",
        description: 'Renvoie "pong" pour vérifier que l’API est en ligne.',
        responses: {
          "200": {
            description: "pong",
            content: {
              "text/plain": {
                example: "pong",
              },
            },
          },
        },
      },
    },
    "/api/brvm": {
      get: {
        summary: "Données BRVM",
        description: "Renvoie les données du marché BRVM en cache.",
        responses: {
          "200": {
            description: "Liste des données BRVM",
            content: {
              "application/json": {
                example: [
                  {
                    symbol: "SGBC",
                    name: "Société Générale CI",
                    price: 1450,
                    change: 2.5,
                    date: "2025-10-10T08:00:00Z",
                  },
                ],
              },
            },
          },
        },
      },
    },
    "/api/news": {
      get: {
        summary: "Actualités financières",
        description: "Renvoie les dernières actualités du marché BRVM.",
        responses: {
          "200": {
            description: "Liste des actualités",
            content: {
              "application/json": {
                example: [
                  {
                    source: "Ecofin",
                    title: "BRVM monte",
                    html: "<p>Actualité fictive du 2025-10-06</p>",
                    date: "2025-10-09T20:18:20.636Z",
                  },
                ],
              },
            },
          },
        },
      },
    },
  },
};

export default swaggerDocument;
