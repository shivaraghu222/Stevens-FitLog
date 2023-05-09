const mongoose = require("mongoose");

const runningSchema = new mongoose.Schema(
    {
        day: Number,
        month: String,
        distance: Number,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Running", runningSchema);