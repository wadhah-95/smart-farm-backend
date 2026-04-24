let stocks = [
  { id: 1, name: "Engrais", quantity: 10, unit: "kg" }
];

// CREATE
exports.createStock = (req, res) => {
  const newStock = {
    id: stocks.length + 1,
    ...req.body
  };
  stocks.push(newStock);
  res.status(201).json(newStock);
};

// GET ALL
exports.getStocks = (req, res) => {
  res.json(stocks);
};

// GET ONE
exports.getStockById = (req, res) => {
  const stock = stocks.find(s => s.id == req.params.id);
  if (!stock) return res.status(404).json({ message: "Not found" });
  res.json(stock);
};

// UPDATE
exports.updateStock = (req, res) => {
  const stock = stocks.find(s => s.id == req.params.id);
  if (!stock) return res.status(404).json({ message: "Not found" });

  Object.assign(stock, req.body);
  res.json(stock);
};

// DELETE
exports.deleteStock = (req, res) => {
  stocks = stocks.filter(s => s.id != req.params.id);
  res.json({ message: "Deleted" });
};