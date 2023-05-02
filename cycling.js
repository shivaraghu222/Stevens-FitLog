const mongoose = require("mongoose");

const cyclingSchema = new mongoose.Schema(
    {
        day: Number,
        month: String,
        distance: Number,
        },
    { timestamps: true }
);

module.exports = mongoose.model("Cycling", cyclingSchema);