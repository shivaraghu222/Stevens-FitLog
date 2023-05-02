var express = require('express');
var router = express.Router();
const User_Model = require('../models/user');

router.get("/userdata", (req, res) => {
	res.json({
		Msg: "All user data",
	});
});

module.exports = router;