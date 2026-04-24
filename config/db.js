const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/smartfarm");
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB error:", error.message);
  }
};

module.exports = connectDB;