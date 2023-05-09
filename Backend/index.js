const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

const os = require('os');
const { exec } = require('child_process');
const url = 'http://localhost:8000';

const User_Model = require('./models/user');
const Fitness_Model = require('./models/fitnessPlan');
const Running_Model = require('./models/running');
const DietFood_Model = require('./models/dietFood');
const Cycling_Model = require('./models/cycling');
const Calory_Model = require('./models/calories');

const { usersRouter, checkTokenValidation } = require('./routes/authRoutes');
const fitnessPlanRouter = require('./routes/fitnessRoutes');
const runningRouter = require('./routes/runningRoutes');
const cyclingRouter = require('./routes/cyclingRoutes');
const caloryRouter = require('./routes/caloryRoutes');
const dietFoodRouter = require('./routes/dietFoodRoutes');

const data3 = [
    {
        "day": "Monday",
        "diet_type": "Breakfast",
        "title": "Omelette",
        "description": "Healthy and delicious"
    },
    {
        "day": "Tuesday",
        "diet_type": "Lunch",
        "title": "Salad",
        "description": "Quick and easy to make"
    },
    {
        "day": "Wednesday",
        "diet_type": "Meal",
        "title": "Grilled chicken",
        "description": "Perfect for a summer day",
    }
];

const connection_string = 'mongodb+srv://yhao26:tTPhGl3RAnO0NJks@cluster0.s6gwaum.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
// mongoose.connect("mongodb://localhost:27017/FitnessDB")
    .then(async () => {
        const count3 = await DietFood_Model.countDocuments();
        if (count3 === 0) {
            await DietFood_Model.insertMany(data3);
        }
        app.listen(8000, function () {
            console.log("Server is running on port 8000!!");
            if (os.platform() === 'win32') {
                // Windows
                exec(`start "" "${url}"`);
            } else if (os.platform() === 'darwin') {
                // macOS
                exec(`open "${url}"`);
            } else {
                // Linux or other platform
                exec(`xdg-open "${url}"`);
            }
        });
    })
    .catch((err) => console.error(err));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../login.html"));
});
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, "../login.html"));
});
app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, "../register.html"));
});
app.get('/password.html', (req, res) => {
    res.sendFile(path.join(__dirname, "../password.html"));
});
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});
app.get('/charts.html', (req, res) => {
    res.sendFile(path.join(__dirname, "../charts.html"));
});
app.get('/tables.html', (req, res) => {
    res.sendFile(path.join(__dirname, "../tables.html"));
});
app.get('/dietmenu.html', (req, res) => {
    res.sendFile(path.join(__dirname, "../dietmenu.html"));
});
app.get('/log.html', (req, res) => {
    res.sendFile(path.join(__dirname, "../log.html"));
});

app.use('/auth', usersRouter);
app.use('/fitness', fitnessPlanRouter);
app.use('/running', runningRouter);
app.use('/cycling', cyclingRouter);
app.use('/calory', caloryRouter);
app.use('/diet_food', dietFoodRouter);

app.get('/average', checkTokenValidation, async (req, res) => {
    const cyclingData = await Cycling_Model.find({ userId: req.user._id }).select('distance');
    const totalCyclingData = await Cycling_Model.find({ userId: req.user._id }).select('distance').countDocuments();
    const runningData = await Running_Model.find({ userId: req.user._id }).select('distance');
    const totalRunningData = await Running_Model.find({ userId: req.user._id }).select('distance').countDocuments();
    const caloryData = await Calory_Model.find({ userId: req.user._id }).select('calory');
    const totalCaloryData = await Calory_Model.find({ userId: req.user._id }).select('calory').countDocuments();

    let ca = 0;
    cyclingData.forEach(element => {
        ca += element.distance;
    });
    let ra = 0;
    runningData.forEach(element => {
        ra += element.distance;
    });
    let cala = 0;
    caloryData.forEach(element => {
        cala += element.calory;
    });
    const cyclingAverage = ca > 0 ? Math.round((ca / totalCyclingData) * 100) / 100 : 0;
    const runningAverage = ra > 0 ? Math.round((ra / totalRunningData) * 100) / 100 : 0;
    const caloryAverage = cala > 0 ? Math.round((cala / totalCaloryData) * 100) / 100 : 0;
    let weeklyAverage = (cyclingAverage + runningAverage + caloryAverage) / 3;
    weeklyAverage = weeklyAverage > 0 ? Math.round(weeklyAverage * 100) / 100 : 0
    res.json({
        cyclingAverage: cyclingAverage,
        runningAverage: runningAverage,
        caloryAverage: caloryAverage,
        weeklyAverage: weeklyAverage
    })
});

app.use(function (req, res, next) {
    res.status(404).json({
        error: "No such route exists"
    })
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
        error: "Something went wrong!!"
    });
});