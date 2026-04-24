const express = require('express');
const app = express();

// routes
const farmRoutes = require('./routes/farm.routes');
const stockRoutes = require('./routes/stock.routes');

app.use(express.json());

// routes
app.use('/api', farmRoutes);
app.use('/api/stock', stockRoutes);

// test
app.get('/', (req, res) => {
  res.send('API is running');
});

// serveur
app.listen(3000, () => {
  console.log('Server running on port 3000');
});