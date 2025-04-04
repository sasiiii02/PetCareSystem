const mongoose = require('mongoose');

const adoptionFormSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    petType: { type: String, required: true },
    petName: { type: String, required: true },
    homeType: { type: String, required: true },
    employmentStatus: { type: String, required: true },
    hasYard: { type: Boolean, required: true },
    hasOtherPets: { type: Boolean, required: true },
    additionalInfo: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('adoptionForm', adoptionFormSchema);