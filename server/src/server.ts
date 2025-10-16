import express from 'express';

const app = express();
const PORT = 5000;

app.get('/', (_req, res) => {
  res.send('✅ Serveur OK');
});

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur le port ${PORT}`);
});
