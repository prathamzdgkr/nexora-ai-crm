const express = require("express");
const router = express.Router();

const {
    createLead,
    getLeads,
    updateLead,
    deleteLead
} = require("../controllers/leadController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createLead);
router.get("/", protect, getLeads);
router.put("/:id", protect, updateLead);
router.delete("/:id", protect, deleteLead);

module.exports = router;