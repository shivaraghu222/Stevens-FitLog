const mongoose = require("mongoose");

const yogaSchema = new mongoose.Schema(
    {
        day: Number,
        calory: Number,
        time: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("Yoga", yogaSchema);