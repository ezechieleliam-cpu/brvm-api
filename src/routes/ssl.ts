import express from "express";
import { verifyBrvmSsl } from "../utils/sslCheck.js";

const router = express.Router();

// 🔐 Vérification SSL BRVM
router.get("/ssl/status", async (_, res) => {
  try {
    const result = await verifyBrvmSsl();
    res.json(result);
  } catch (error) {
    console.error("❌ Erreur SSL:", error);
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
});

export { router as sslRoutes };
