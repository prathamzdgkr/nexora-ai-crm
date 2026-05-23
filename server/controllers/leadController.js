const Lead = require("../models/Lead");
const ALLOWED_STATUSES = ["New", "Contacted", "Qualified", "Closed"];

// CREATE
const createLead = async (req, res) => {
    try {
        const lead = await Lead.create({ ...req.body, assignedTo: req.user._id });
        res.status(201).json(lead);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ (Filtered by user)
const getLeads = async (req, res) => {
    try {
        const leads = await Lead.find({ assignedTo: req.user._id }).populate("assignedTo", "name email");
        res.json(leads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE
const updateLead = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, company, status } = req.body;

        const lead = await Lead.findOne({ _id: id, assignedTo: req.user._id });
        
        if (!lead) return res.status(404).json({ message: "Lead not found" });

        // VALIDATION
        if (status && !ALLOWED_STATUSES.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        // UPDATE ALL FIELDS (Crucial Step)
        lead.name = name || lead.name;
        lead.email = email || lead.email;
        lead.company = company || lead.company;
        lead.status = status || lead.status;

        await lead.save();
        res.json(lead); // Now returns the updated object
    } catch (error) {
        console.error("Update Lead Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// DELETE
const deleteLead = async (req, res) => {
    try {
        const deleted = await Lead.findOneAndDelete({ _id: req.params.id, assignedTo: req.user._id });
        if (!deleted) return res.status(404).json({ message: "Lead not found" });
        res.json({ message: "Lead deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createLead, getLeads, updateLead, deleteLead };