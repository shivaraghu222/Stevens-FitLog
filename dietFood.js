const mongoose = require("mongoose");

const dietFoodSchema = new mongoose.Schema(
    {
        day: String,
        diet_type: {
            type: String,
            enum: ['breakfast', 'lunch', 'meal', 'dinner']
        },
        title: String,
        description: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("DietFood", dietFoodSchema);