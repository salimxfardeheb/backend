const mongoose = require("mongoose");

const commandSchema = new mongoose.Schema({
  idProduct: { type: String, required: true },
  idClient: { type: Number, required: true },
  
});

// create product collection based on productSchema
const command = mongoose.model("product", commandSchema);

module.exports = {command};