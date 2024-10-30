const mongoose = require("mongoose");

//define schema for product
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
});

// create product collection based on productSchema
const product = mongoose.model("product", productSchema);

module.exports = { product };