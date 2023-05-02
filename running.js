const mongoose = require("mongoose");

const runningSchema = new mongoose.Schema(
    {
        day: Number,
        month: String,
        distance: Number,
        },
    { timestamps: true }
);

module.exports = mongoose.model("Running", runningSchema);