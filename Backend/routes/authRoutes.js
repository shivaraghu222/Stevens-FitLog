var express = require('express');
const bcrypt = require("bcrypt");
const jwt = require('jwt-simple');

const saltRounds = 10;
var router = express.Router();
const User_Model = require('../models/user');

const generateToken = (user, expiresIn) => {
	const payload = {
		id: user._id,
		username: user.username,
		exp: Math.floor(Date.now() / 1000) + expiresIn
	}
	const secretKey = 'mySecretKey';
	const token = jwt.encode(payload, secretKey);
	return token;
}

const checkTokenValidation = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	const secretKey = 'mySecretKey';

	if (token == null)
		return res.status(403).json({ Error: "You are not authorized to access this API" });
	// if(token== null) throw new Error('Token not available')

	try {
		const decoded = jwt.decode(token, secretKey);
		// Check if token is valid and not expired
		User_Model.findById(decoded.id).then((foundOne) => {
			if (foundOne) {
				req.user = foundOne;
				next();
			} else {
				return res.status(404).json({ Error: "No user data available" });
			}
		});
	} catch (error) {
		res.status(401).json({ error: 'Token invalid or expired' });
	}
}

router.post("/register", async (req, res) => {
	let obj = {
		isEmailExist: await User_Model.exists({
			email: req.body.email,
		}),
	};
	if (obj.isEmailExist) {
		res.status(400).json({ Error: "User already exist with this email!!" });
	} else {
		const salt = bcrypt.genSaltSync(saltRounds);
		bcrypt.hash(req.body.password, salt, (err, hash) => {
			if (!err) {
				const user = new User_Model({
					...req.body,
					password: hash,
				});
				user.save().then((savedObj) => {
					// console.log(savedObj);
					const token = generateToken(savedObj, 604800); //7 days
					const { password, __v, createdAt, updatedAt, ...userObj } = savedObj._doc
					res.json({
						Msg: "User registered successfully",
						userdata: userObj,
						Token: token,
					});
				}).catch(err => {
					console.log(err);
					res.json({
						Error: "Error occured in creating user. Please try again!!",
					});
				});
			} else {
				res.json({
					Error: "Something went wrong, please try again later!!",
				});
			}
		});
	}
})

router.post("/login", async (req, res) => {
	const query = { email: req.body.email };
	User_Model.findOne(query).then((user) => {
		bcrypt.compare(
			req.body.password,
			user.password,
			(err, result) => {
				if (result === true) {
					const token = generateToken(user, 604800); //Genrate token
					res.status(200).json({
						Msg: "Successfully logged in!!",
						Token: token,
					});
				} else {
					res.status(400).json({
						Error: "Password incorrect for requested user!!",
					});
				}
			}
		);
	}).catch(err => {
		res.status(404).json({ Error: "User not found" });
	});
})

router.post("/checkUser", async (req, res) => {
	const isUserExist = await User_Model.exists({
		firstname: req.body.fname,
		lastname: req.body.lname,
		email: req.body.email
	});
	if (isUserExist) {
		res.status(200).json({ ok: true });
	} else {
		res.status(403).json({ Error: 'User not found with this data!!' });
	}
})

router.post("/reset_password", async (req, res) => {
	const user = await User_Model.findOne({ email: req.body.email });
	if (!user) {
		res.json({ Error: "User not found" });
	} else {
		if (req.body.new_password === req.body.confirm_password) {
			const salt = bcrypt.genSaltSync(saltRounds);
			const hash = bcrypt.hashSync(req.body.new_password, salt);
			// console.log(salt,'**',hash)
			User_Model.findByIdAndUpdate(
				user._id,
				{ password: hash }
			).then(updated => {
				const { password, __v, createdAt, updatedAt, ...updatedObj } = updated._doc
				res.json({
					Msg: "Your password has been updated successfully!!",
					Userdata: updatedObj,
				});
			}).catch(err => {
				console.log(err);
				res.json({ Error: "Error occured in password reset" });
			});
		} else {
			res.json({ Error: "Your passwords did not match!!" });
		}
	}
})

router.get("/userdata", checkTokenValidation, (req, res) => {
	res.json({
		Msg: req.user,
	});
});

module.exports = {
	checkTokenValidation: checkTokenValidation,
	usersRouter: router
};
