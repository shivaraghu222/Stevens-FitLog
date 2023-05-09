const mongoose = require("mongoose");

const calorySchema = new mongoose.Schema(
    {
        day: Number,
        month: String,
        calory: Number,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Calory", calorySchema);