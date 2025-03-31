const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true }, // Store as string or Date
  time: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  eventImageURL: { type: String, required: true }, // Store image URL
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
