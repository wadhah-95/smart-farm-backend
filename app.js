// app.js
require("dotenv").config({ path: "./.env" });
const express = require("express");
const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

const app = express();

app.get("/", (req, res) => {
  res.send("Smart Farm API running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

console.log("PASSWORD:", process.env.DB_PASSWORD);