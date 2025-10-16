import express from 'express';
import mongoose from 'mongoose';
import { cache } from "./utils/cache";
import { sslRoutes } from "./routes/ssl";

const app = express();
const PORT = process.env.PORT || 10000;

mongoose.connect(process.env.MONGO_URI!)
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});
