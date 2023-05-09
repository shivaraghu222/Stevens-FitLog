var express = require('express');
var router = express.Router();
const DietFood_Model = require('../models/dietFood');
const { checkTokenValidation } = require('./authRoutes');

router.get('/', checkTokenValidation, (req, res) => {
    DietFood_Model.find({ userId: req.user._id }).then((result) => {
        res.json({
            data: result,
        });
    }).catch((err) => {
        res.json({
            Error: "Error in fetching diet food data"
        })
    });
});

router.post('/', checkTokenValidation, (req, res) => {
    const dietFood = new DietFood_Model({ ...req.body, userId: req.user._id });
    dietFood.save().then((savedDoc) => {
        res.json({
            Msg: "Diet food created successfully",
            dietFoodData: savedDoc,
        });
    }).catch((err) => {
        res.json({
            Error: "Error occurred in creating dietFood",
        });
    })
});

module.exports = router;