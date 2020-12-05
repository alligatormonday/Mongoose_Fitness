const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// every property in the model has its own specific object of type definitions

const workOutSchema = new Schema({
    day: {
        type: Date(),
        default: Date.now,
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true
            }, 
            name: {
                type: String, 
                trim: true
            }, 
            duration: {
                type: Number
            }, 
            distance: {
                type: Number
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
});

const Workout = mongoose.model("Workout", workOutSchema);

module.exports = Workout;
