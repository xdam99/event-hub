"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/events.ts
const express_1 = require("express");
const mysql_1 = __importDefault(require("../db/mysql"));
const router = (0, express_1.Router)();
// GET /events
router.get('/', async (_req, res) => {
    try {
        const [rows] = await mysql_1.default.query(`
      SELECT e.*, v.name AS venue_name, c.name AS category_name, u.name AS organizer_name
      FROM events e
      LEFT JOIN venues v ON e.venue_id = v.id
      LEFT JOIN categories c ON e.category_id = c.id
      LEFT JOIN users u ON e.organizer_id = u.id
    `);
        res.json(rows);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// GET /events/:id
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await mysql_1.default.query('SELECT * FROM events WHERE id = ?', [req.params.id]);
        res.json(rows[0] || null);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.default = router;
