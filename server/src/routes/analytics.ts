import { Router } from 'express';
import { mongoDB } from '../db/mongo';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const stats = await mongoDB.collection('analytics').find().toArray();
    res.json(stats);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
