"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Event_1 = __importDefault(require("../models/Event"));
const router = express_1.default.Router();
router.get('/', async (_req, res) => {
    try {
        const events = await Event_1.default.find();
        res.json(events);
    }
    catch (err) {
        res.status(500).json({ error: 'Erreur récupération événements' });
    }
});
router.post('/', async (req, res) => {
    try {
        const event = new Event_1.default(req.body);
        await event.save();
        res.status(201).json(event);
    }
    catch (err) {
        res.status(400).json({ error: 'Erreur création événement' });
    }
});
exports.default = router;
