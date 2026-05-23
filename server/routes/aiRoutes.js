const express = require("express");
const router = express.Router();
const { analyzeLead } = require("../controllers/aiController");
const { protect } = require("../middleware/authMiddleware");

// POST /api/ai/:id
router.post("/:id", protect, analyzeLead);

module.exports = router;