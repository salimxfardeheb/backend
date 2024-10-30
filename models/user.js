const mongoose = require("mongoose");

//define schema for user
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// create user collection based on userSchema
const User = mongoose.model("User", userSchema);

module.exports = { User };