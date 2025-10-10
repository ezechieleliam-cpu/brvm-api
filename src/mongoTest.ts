// src/mongoTest.ts
import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('✅ Connexion MongoDB réussie'))
  .catch((err) => console.error('❌ Erreur MongoDB :', err));

const uri = process.env.MONGO_URI!;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connexion MongoDB réussie !");
  } catch (error) {
    console.error("❌ Erreur MongoDB :", error);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
