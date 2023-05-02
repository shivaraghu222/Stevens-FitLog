const mongoose = require("mongoose");

const fitnessSchema = new mongoose.Schema(
    {
        title: { type: String },
        date: Date,
        sets: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("FitnessPlan", fitnessSchema);