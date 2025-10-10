import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI!;
if (!uri) {
  console.error('❌ MONGO_URI manquant dans .env');
  process.exit(1);
}

// 🔍 Test avec Mongoose
async function testMongoose() {
  try {
    await mongoose.connect(uri);
    console.log('✅ [Mongoose] Connexion réussie');
  } catch (err: any) {
    console.error('❌ [Mongoose] Erreur :', err.message);
  } finally {
    await mongoose.disconnect();
  }
}

// 🔍 Test avec MongoDB natif
async function testNativeMongo() {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
    }
  });

  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('✅ [MongoClient] Connexion réussie');
  } catch (error) {
    console.error('❌ [MongoClient] Erreur :', error);
  } finally {
    await client.close();
  }
}

// 🚀 Lancer les deux tests
(async () => {
  await testMongoose();
  await testNativeMongo();
})();
