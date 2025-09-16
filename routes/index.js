// routes/index.js
import { Router } from 'express';

const router = Router();

router.get('/events', (req, res) => {
  res.json({ message: 'Liste des événements' });
});

router.post('/events', (req, res) => {
  const newEvent = req.body;
  res.status(201).json({ message: 'Événement créé', data: newEvent });
});

export default router;
