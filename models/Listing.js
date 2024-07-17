const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        images: [String],
        availability_dates: [Date],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
