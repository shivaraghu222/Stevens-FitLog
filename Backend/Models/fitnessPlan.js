const mongoose = require("mongoose");

const fitnessSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        datetime: Date,
        link: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("FitnessPlan", fitnessSchema);