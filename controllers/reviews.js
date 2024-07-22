
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
const verifyHost = require("../middleware/verify-host");
const Review = require("../models/Review");
const Listing = require("../models/Listing");
const mongoose = require("mongoose");

//Create a review by verifies user 

router.post("/", verifyToken, async (req, res) => {
    try {
        const { content, rating, listingId } = req.body;
        const user = req.user;

        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ error: "Listing not found" });
        }

        const newReview = new Review({
            content,
            rating,
            listing: listingId,
            user: user._id
        });

        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Getting all reviews
router.get( "/", async ( req, res) => {
    try {
        const review = await Review.find();
        
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

//Getting review by id
router.get("/:id",  async( req, res) => {
    try {
        const review = await Review.findById(req.params.id)
        if(!review) {
            return res.status(404).json( {error: "No reviews found"})
        };
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

//Getting reviews by applying listingId to use in frontend
router.get("/find/:listingId", async(req, res) => {
    try {
        
    const reviews = await Review.find( {listing: req.params.listingId});
    
    res.json(reviews);

    } catch (error) {
        console.log("error", error)
    }
})

//user can update reviews
router.put("/:id", verifyToken, async(req, res) => {
    try {
        
        const review = await Review.findById(req.params.id);

        if(!review) {
            return res.status(404).json({ error: "No review available"});
        };

        Object.assign(review, req.body);
        await review.save();
        res.status(200).json(review)

    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

//delete the review

router.delete("/:id", verifyToken, async(req, res) => {
     try {
        
const review = await Review.findById(req.params.id);

if( !review) {
    return res.status(404).json({ error: "No review available"});
};

await Review.findByIdAndDelete(req.params.id);
res.status(500).json({message: "Review removed"});

     } catch (error) {
        res.status(500).json({error: error.message})
     }
})

module.exports = router;
