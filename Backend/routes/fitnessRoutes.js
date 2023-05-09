var express = require('express');
var router = express.Router();
const Fitness_Plan_Model = require('../models/fitnessPlan');
const { checkTokenValidation } = require('./authRoutes');

router.get("/plans", checkTokenValidation, (req, res) => {
    Fitness_Plan_Model.find({ userId: req.user._id }).then((result) => {
        res.json({
            data: result,
        });
    }).catch((err) => {
        res.json({
            Error: "Error in fetching plans"
        })
    });
});

router.get("/plan/:plan_id", checkTokenValidation, (req, res) => {
    const { plan_id } = req.params;
    Fitness_Plan_Model.findById(plan_id).then((doc, err) => {
        if (doc) {
            res.json({
                data: doc,
            });
        }
        else {
            res.json({
                Error: err
            });
        }
    });
});

router.post("/plans", checkTokenValidation, (req, res) => {
    const plan = new Fitness_Plan_Model({
        title: req.body.title,
        description: req.body.description,
        datetime: req.body.datetime,
        link: req.body.link,
        userId: req.user._id
    });
    plan.save().then((savedDoc) => {
        res.json({
            Msg: "Plan created successfully",
            planData: savedDoc,
        });
    }).catch((err) => {
        res.json({
            Error: "Error occurred in creating plan",
        });
    })
});

router.delete("/plan/:plan_id", checkTokenValidation, (req, res) => {
    const { plan_id } = req.params;
    Fitness_Plan_Model.findByIdAndDelete(plan_id).then((result) => {
        res.status(200).json({
            Msg: "Plan deleted successfully"
        });
    }).catch((err) => {
        res.json({
            Error: "Error occurred in deleing plan"
        });
    });
})

module.exports = router;
