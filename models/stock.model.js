const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Stock", stockSchema);