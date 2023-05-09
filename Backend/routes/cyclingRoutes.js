var express = require('express');
var router = express.Router();
const Cycling_Model = require('../models/cycling');
const { checkTokenValidation } = require('./authRoutes');

router.get('/', checkTokenValidation, (req, res) => {
    Cycling_Model.find({ userId: req.user._id }).then((result) => {
        res.json({
            data: result,
        });
    }).catch((err) => {
        res.json({
            Error: "Error in fetching cycling data"
        })
    });
});

router.post('/', checkTokenValidation, (req, res) => {
    const cyclingData = new Cycling_Model({ ...req.body, userId: req.user._id });
    cyclingData.save().then((savedDoc) => {
        res.json({
            Msg: "Cycling data added successfully",
            cyclingData: savedDoc,
        });
    }).catch((err) => {
        res.json({
            Error: "Error occurred in cycling data",
        });
    })
});

module.exports = router;