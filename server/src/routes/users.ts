// src/routes/users.ts
import { Router } from 'express';
import mysqlPool from '../db/mysql';

const router = Router();

router.get('/', async (_req, res) => {
  const [rows] = await mysqlPool.query('SELECT * FROM users');
  res.json(rows);
});

router.get('/:id', async (req, res) => {
  const [rows]: any = await mysqlPool.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
  res.json(rows[0] || null);
});

export default router;
