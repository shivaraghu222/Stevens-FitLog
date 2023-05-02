var express = require('express');
var router = express.Router();
const DietFood_Model = require('../models/dietFood');

router.get('/', (req, res) => {
    DietFood_Model.find({}).then((result) => {
        res.json({
            data: result,
        });
    }).catch((err) => {
        res.json({
            Error: "Error in fetching diet food data"
        })
    });
});

module.exports = router;