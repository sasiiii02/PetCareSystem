const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
    eventId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Event', 
      required: true 
    },
    userId: { 
      type: String, // Store UUID instead of MongoDB ObjectId
      required: true 
    },
    name: { type: String, required: true }, 
    email: { type: String, required: true }, 
    tickets: { type: Number, required: true, default: 1 },
    registeredAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registration', registrationSchema);
