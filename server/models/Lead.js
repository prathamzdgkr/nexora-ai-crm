const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: String,

    company: String,

    phone: String,

    status: {
      type: String,
      // This array must match the stages in PipelineBoard.jsx exactly
      enum: ["New", "Contacted", "Qualified", "Closed"],
      default: "New",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);