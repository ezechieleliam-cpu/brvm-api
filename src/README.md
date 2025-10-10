# 📈 BRVM API

Une API Express + MongoDB pour centraliser les données du marché BRVM, les actualités financières, et les historiques de cotation. Conçue pour être extensible, automatisée et intégrable dans des dashboards Streamlit ou des applications tierces.

---

## 🚀 Fonctionnalités

- 🔄 Scraping automatique des données BRVM
- 📰 Agrégation des actualités financières (Ecofin, Jeune Afrique…)
- 🧠 Mise en cache pour réponse rapide
- 📊 Endpoints RESTful pour les données, l’historique et les actualités
- 🧪 Swagger UI pour tester les routes
- 🧱 Architecture modulaire TypeScript
- 🌐 Déploiement sur Render avec GitHub CI

---

## 📦 Endpoints disponibles

| Méthode | Route                     | Description                          |
|--------|---------------------------|--------------------------------------|
| `GET`  | `/ping`                   | Vérifie que l’API est en ligne       |
| `GET`  | `/api/brvm`              | Données BRVM en cache                |
| `GET`  | `/api/news`              | Actualités financières               |
| `GET`  | `/api/history`           | Historique des cotations             |
| `POST` | `/api/scrape`            | Lance un scraping manuel             |
| `POST` | `/api/insert`            | Insère manuellement des données      |
| `GET`  | `/api-docs`              | Interface Swagger                    |

---

## 🛠️ Installation locale

```bash
git clone https://github.com/ezechieleliam-cpu/brvm-api.git
cd brvm-api
npm install
npm run build
node dist/index.js
