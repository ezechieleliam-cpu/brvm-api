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
router.get('/status', (_, res) => {
    const brvmData = cache.get('brvmData') || [];
    const brvmNews = cache.get('brvmNews') || [];
    const lastUpdate = cache.get('lastUpdate') || null;
    res.status(200).json({
        brvmCount: brvmData.length,
        newsCount: brvmNews.length,
        lastUpdate
    });
});
export default router;
