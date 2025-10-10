import express, { Request, Response } from 'express';
import { autoUpdate } from '../AutoUpdater.js'; // ✅ extension .js
import { cache } from '../utils/cache.js'; // ✅ extension .js

const router = express.Router();

router.post('/', async (_: Request, res: Response) => { 
  try {
    await autoUpdate();
    res.status(200).json({ message: '✅ Mise à jour BRVM déclenchée' });
  } catch (error) {
    console.error('❌ Erreur /api/scrape :', error);
    res.status(500).json({ error: '❌ Erreur lors du scraping' });
  }
});

router.get('/status', (_: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    lastUpdate: cache.get('lastUpdate'),
lastCount: cache.get('lastCount')

  });
});

export default router;
