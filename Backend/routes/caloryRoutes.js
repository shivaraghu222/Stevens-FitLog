var express = require('express');
var router = express.Router();
const Calory_Model = require('../models/calories');
const { checkTokenValidation } = require('./authRoutes');

router.get('/', checkTokenValidation, (req, res) => {
    Calory_Model.find({ userId: req.user._id }).then((result) => {
        res.json({
            data: result,
        });
    }).catch((err) => {
        res.json({
            Error: "Error in fetching calory data"
        })
    });
});

router.post('/', checkTokenValidation, (req, res) => {
    const calory = new Calory_Model({ ...req.body, userId: req.user._id });
    calory.save().then((savedDoc) => {
        res.json({
            Msg: "Calories added successfully",
            caloryData: savedDoc,
        });
    }).catch((err) => {
        res.json({
            Error: "Error occurred in calory data",
        });
    })
});

module.exports = router;