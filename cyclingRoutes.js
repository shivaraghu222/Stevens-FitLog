var express = require('express');
var router = express.Router();
const Cycling_Model = require('../models/cycling');

router.get('/', (req, res) => {
    Cycling_Model.find({}).then((result) => {
        res.json({
            data: result,
        });
    }).catch((err) => {
        res.json({
            Error: "Error in fetching cycling data"
        })
    });
});

module.exports = router;