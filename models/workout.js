const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workOutSchema = new Schema({
    day: {
        type: String,
        unique: true
    },
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Note"
        }
    ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
