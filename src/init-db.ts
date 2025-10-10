import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

// 📦 Modèles
import StockModel from './models/StockModel.js';
import NewsModel from './models/NewsModel.js';
import LogModel from './models/LogModel.js';

const uri = process.env.MONGO_URI!;
if (!uri) {
  console.error('❌ MONGO_URI manquant dans .env');
  process.exit(1);
}

async function seedDatabase() {
  try {
    await mongoose.connect(uri);
    console.log('✅ Connexion MongoDB réussie');

    // 🧹 Nettoyage
    await StockModel.deleteMany({});
    await NewsModel.deleteMany({});
    await LogModel.deleteMany({});

    // 📊 Insertion stocks
    const stocks = await StockModel.insertMany([
      { symbol: 'SGBC', name: 'Société Générale Cameroun', price: 3450, variation: 1.2, date: new Date() },
      { symbol: 'BOA', name: 'Bank of Africa', price: 2850, variation: -0.5, date: new Date() }
    ]);

    // 📰 Insertion news
    const news = await NewsModel.insertMany([
  {
    title: 'BRVM clôture en hausse',
    content: 'La BRVM a terminé la séance sur une note positive.',
    html: '<p>La BRVM a terminé la séance sur une note positive.</p>',
    url: 'https://brvm.org/news/cloture-haussiere',
    source: 'BRVM',
    date: new Date()
  },
  {
    title: 'SGBC progresse',
    content: 'La SGBC affiche une variation de +1.2%.',
    html: '<p>La SGBC affiche une variation de +1.2%.</p>',
    url: 'https://brvm.org/news/sgbc-hausse',
    source: 'BRVM',
    date: new Date()
  }
]);

    // 📋 Insertion logs
    const logs = await LogModel.insertMany([
      { action: 'init-db', status: 'success', timestamp: new Date() }
    ]);

    console.log(`✅ Stocks insérés : ${stocks.length}`);
    console.log(`✅ News insérées : ${news.length}`);
    console.log(`✅ Logs insérés : ${logs.length}`);
  } catch (error) {
    console.error('❌ Erreur init-db :', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Déconnexion MongoDB terminée');
  }
}

seedDatabase();
