
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSChema = new Schema( {

    content: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1, 
        max: 5
    },
    listing: {
        type: Schema.Types.ObjectId,
        ref: "Listing",
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, {timestamps: true});

const Review = mongoose.model("Review", reviewSChema);

module.exports = Review;