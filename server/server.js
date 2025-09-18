// server.js
import express from 'express';
import morgan from 'morgan';          // Pour le logging HTTP
import cors from 'cors';              // Pour autoriser les requêtes cross-origin
import dotenv from 'dotenv';          // Pour gérer les variables d'environnement
import routes from './routes/index.js'; // Ton fichier de routes

// Chargement des variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globaux
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());             // Pour parser le JSON
app.use(express.urlencoded({ extended: true })); // Pour parser les formulaires

// Routes
app.use('/api', routes);

// Route de base
app.get('/', (req, res) => {
  res.send('Bienvenue sur l’API EventHub 🚀');
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});

