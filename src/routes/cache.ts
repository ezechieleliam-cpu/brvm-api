import express from "express";
import { cache } from "../utils/cache.js"; // ✅

const router = express.Router();

router.get("/cache/tx", (req, res) => {
  res.json(cache.tx());
});

export default router;
