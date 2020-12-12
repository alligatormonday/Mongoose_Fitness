const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

// every property in the model has its own specific object of type definitions

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now,
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
            }, 
            name: {
                type: String, 
                trim: true,
                minlength: 3
            }, 
            duration: {
                type: Number,
                min: 1
            }, 
            distance: {
                type: Number,
                min: 1
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            } 
        }
    ]
}, opts);

// Mongoose virtual property with a function with method to get total duration of workout 
workoutSchema.virtual('totalDuration').get(function () {
    let duration = 0;
    this.exercises.forEach(workout => {
        duration += workout.duration;
    });
    return duration;
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
