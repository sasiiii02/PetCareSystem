const AdoptionForm = require('../models/adoptionForm');

exports.createApplication = async (req, res) => {
    try {
        const application = new AdoptionForm(req.body);
        await application.save();
        res.status(201).json(application);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUserApplications = async (req, res) => {
    try {
        if (!req.user || !req.user.email) {
            return res.status(401).json({ error: "Unauthorized: User email is missing" });
        }

        const applications = await AdoptionForm.find({ email: req.user.email });
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateApplication = async (req, res) => {
    try {
        const application = await AdoptionForm.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(application);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteApplication = async (req, res) => {
    try {
        await AdoptionForm.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Application deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllApplications = async (req, res) => {
    try {
        const applications = await AdoptionForm.find();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};