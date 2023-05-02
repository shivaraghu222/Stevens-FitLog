var express = require('express');
var router = express.Router();
const Running_Model = require('../models/running');

router.get('/', (req, res) => {
    Running_Model.find({}).then((result) => {
        res.json({
            data: result,
        });
    }).catch((err) => {
        res.json({
            Error: "Error in fetching running models"
        })
    });
});

module.exports = router;