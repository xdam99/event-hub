import express from 'express';
import cors from 'cors';
import path from 'path';

import usersRoutes from './routes/users';
import authRoutes from './routes/auth';
import eventsRoutes from './routes/events';
import analyticsRoutes from './routes/analytics';
import uploadRouter from './routes/upload';


const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// Routes principales
app.use('/users', usersRoutes);
app.use("/auth", authRoutes);

app.use('/events', eventsRoutes);
app.use('/analytics', analyticsRoutes);

// Servir les fichiers uploadés
const uploadsPath = path.join(process.cwd(), "uploads");
app.use("/uploads", express.static(uploadsPath));

app.use('/upload', uploadRouter)


// Route test
app.get('/', (_req, res) => res.send('✅ Serveur OK '));

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur REST démarré sur http://localhost:${PORT}`);
});
