import express from 'express';
import Event from '../models/Event';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Erreur récupération événements' });
  }
});

router.post('/', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: 'Erreur création événement' });
  }
});

export default router;
