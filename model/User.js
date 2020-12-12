const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 100,
    },
    email: {
        type: String,
        required: true,
        max: 100,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 150,
        min: 6,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema);