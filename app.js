const express = require('express');
const app = express();

// importer les routes
const farmRoutes = require('./routes/farm.routes');

// middleware
app.use(express.json());

// utiliser les routes
app.use('/api', farmRoutes);

// route test
app.get('/', (req, res) => {
    res.send('API is running');
});

// lancer serveur
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

const stockRoutes = require("./routes/stock.routes");

app.use("/api/stock", stockRoutes);