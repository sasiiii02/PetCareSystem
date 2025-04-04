const mongoose = require("mongoose");

const AdoptablePetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  description: String,
  image: String,
  status: { type: String, default: 'Available' }
});

module.exports = mongoose.model("AdoptablePet", AdoptablePetSchema);
