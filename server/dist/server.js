"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("./routes/users"));
const events_1 = __importDefault(require("./routes/events"));
const analytics_1 = __importDefault(require("./routes/analytics"));
const upload_1 = __importDefault(require("./routes/upload"));
const app = (0, express_1.default)();
const PORT = 5000;
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: 'http://localhost:3000' }));
// Routes principales
app.use('/users', users_1.default);
app.use('/events', events_1.default);
app.use('/analytics', analytics_1.default);
// Upload
app.use(upload_1.default);
// Servir les fichiers uploadés
app.use('/uploads', express_1.default.static("uploads"));
app.use('upload', upload_1.default);
// Route test
app.get('/', (_req, res) => res.send('✅ Serveur OK'));
// Lancer le serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur REST démarré sur http://localhost:${PORT}`);
});
