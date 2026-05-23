const Lead = require("../models/Lead");
const { analyzeLeadQuality } = require("../services/geminiService");

const analyzeLead = async (req, res) => {
    try {
        // Find the specific lead using the ID from the URL
        const lead = await Lead.findById(req.params.id).select("-__v -createdAt -updatedAt");

        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }

        // Pass that single lead to Gemini
        const insights = await analyzeLeadQuality(lead);

        res.status(200).json(insights);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { analyzeLead };