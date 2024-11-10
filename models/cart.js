const mongoose = require("mongoose");

// Définition du schéma pour le panier
const cartSchema = new mongoose.Schema({
  id_client: { type: Number, required: true },
  products: [{ 
    id_product: { type: Number, required: true },
    qte: { type: Number, required: true }
  }]
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = { Cart };
