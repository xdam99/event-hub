require('dotenv').config();
const express = require('express');
const mango = require('mango');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('le serveur EventHub fonctionne !');
  console.log(mango);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
