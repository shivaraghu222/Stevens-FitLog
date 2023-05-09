const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		firstname: String,
		lastname: String,
		email: String,
		password: String,
		phone_number: String,
		dob: Date,
		height: Number,
		weight: Number,
		medication: String,		
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);