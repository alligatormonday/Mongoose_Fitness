const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const Workout = require("./models/workout");

const app = express();

const path = require("path");

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });


app.get("/exercise", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/exercise.html"));
});

app.get("/api/workouts/range/", (req, res) => {
    Workout.find({})
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

app.post("/api/workouts/", ({ body }, res) => {
    Workout.create(body)
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

app.put("/api/workouts/:id", ({ body, params }, res) => {
    console.log(body)
    Workout.findByIdAndUpdate(params.id, {$push: {exercises: body}})
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

app.get("/stats", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/stats.html"));
});


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});