const express = require('express');
const mango = require('mango');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('EventHub server is running');
  console.log(mango);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
