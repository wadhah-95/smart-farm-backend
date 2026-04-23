const Stock = require("../models/stock.model");

// CREATE
exports.createStock = async (req, res) => {
  try {
    const stock = new Stock(req.body);
    await stock.save();
    res.status(201).json(stock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ALL
exports.getStocks = async (req, res) => {
  const stocks = await Stock.find();
  res.json(stocks);
};

// READ ONE
exports.getStockById = async (req, res) => {
  const stock = await Stock.findById(req.params.id);
  res.json(stock);
};

// UPDATE
exports.updateStock = async (req, res) => {
  const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(stock);
};

// DELETE
exports.deleteStock = async (req, res) => {
  await Stock.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};