var express = require('express');
var router = express.Router();
const Running_Model = require('../models/running');
const { checkTokenValidation } = require('./authRoutes');

router.get('/', checkTokenValidation, (req, res) => {
    Running_Model.find({ userId: req.user._id }).then((result) => {
        res.json({
            data: result,
        });
    }).catch((err) => {
        res.json({
            Error: "Error in fetching running models"
        })
    });
});

router.post('/', checkTokenValidation, (req, res) => {
    const runningData = new Running_Model({ ...req.body, userId: req.user._id });
    runningData.save().then((savedDoc) => {
        res.json({
            Msg: "Running data added successfully",
            runningData: savedDoc,
        });
    }).catch((err) => {
        res.json({
            Error: "Error occurred in running data",
        });
    })
});

module.exports = router;