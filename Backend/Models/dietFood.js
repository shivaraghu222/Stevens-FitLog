const mongoose = require("mongoose");

const dietFoodSchema = new mongoose.Schema(
    {
        diet_type: {
            type: String,
            enum: ['Breakfast', 'Lunch', 'Meal', 'Dinner']
        },
        day: String,
        title: String,
        description: String,
        datetime: Date,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("DietFood", dietFoodSchema);