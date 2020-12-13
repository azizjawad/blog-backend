const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 4,
        max: 100,
    },
    description: {
        type: String,
        required: true,
        max: 100,
        min: 6
    },
    featured_image: {
        type: String,
        max: 150,
        min: 5,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('posts', postSchema);