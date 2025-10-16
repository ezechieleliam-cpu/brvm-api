import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
import { cache } from "./utils/cache.js";
import StockModel from "./models/StockModel.js";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI!;
if (!uri) {
  console.error("❌ MONGO_URI manquant dans .env");
  process.exit(1);
}

async function testMongoose() {
  try {
    await mongoose.connect(uri);
    const stocks = await StockModel.find();
    console.log(stocks);
    console.log("✅ [Mongoose] Connexion réussie");
  } catch (err) {
  if (err instanceof Error) {
    console.error("❌ [Mongoose] Erreur :", err.message);
  } else {
    console.error("❌ [Mongoose] Erreur inconnue :", err);
  }


  } finally {
    await mongoose.disconnect();
  }
}

async function testNativeMongo() {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ [MongoClient] Connexion réussie");
  } catch (error) {
    console.error("❌ [MongoClient] Erreur :", error);
  } finally {
    await client.close();
  }
}

(async () => {
  await testMongoose();
  await testNativeMongo();
})();
