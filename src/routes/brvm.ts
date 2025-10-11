import express from 'express';
import { cache } from '../utils/cache.js'; // ✅ extension .js requise

const router = express.Router();

/**
 * @openapi
 * /api/brvm/status:
 *   get:
 *     summary: Vérifie le statut du cache BRVM
 *     tags:
 *       - Monitoring
 *     responses:
 *       200:
 *         description: Statut du cache
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 brvmCount:
 *                   type: number
 *                 newsCount:
 *                   type: number
 *                 lastUpdate:
 *                   type: string
 *                   format: date-time
 */
router.get('/', (req, res) => {
  res.json({ message: 'BRVM stocks endpoint is live ✅' });
});

export default router;
