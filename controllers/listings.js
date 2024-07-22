const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
const verifyHost = require("../middleware/verify-host");
const Listing = require("../models/Listing");

// Create listing (verified host)
router.post("/", verifyToken, verifyHost, async (req, res) => {
    try {
        const newListing = new Listing({ ...req.body, owner: req.user._id });
        await newListing.save();
        res.status(201).json(newListing);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all listings
router.get("/", async (req, res) => {
    try {
        const listings = await Listing.find().populate('owner', 'username');
        res.status(200).json(listings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//Search
router.get("/search", async (req, res) => {
    try {
        const query = req.query.q;
        // console.log("search q", query);
        const listings = await Listing.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } },
                { "location.city": { $regex: query, $options: "i" } },
                { "location.state": { $regex: query, $options: "i" } },
                { "location.country": { $regex: query, $options: "i" } },
            ],
        });
        // console.log("listings", listings);
        res.status(200).json(listings);
    } catch (err) {
        console.error("Error during search:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// Get listings posted by User (verified host)
router.get("/mylistings", verifyToken, verifyHost, async (req, res) => {
    try {
        const listings = await Listing.find({ owner: req.user._id });
        res.status(200).json(listings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a listing by ID
router.get("/:id", async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id).populate('owner', 'username');
        if (!listing) {
            return res.status(404).json({ error: "Listing not found" });
        }
        res.status(200).json(listing);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update listing (verified host)
router.put("/:id", verifyToken, verifyHost, async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ error: "Listing not found" });
        }
        if (listing.owner.toString() !== req.user._id) {
            // only owner of listing can update/edit
            return res.status(401).json({ error: "You are not the owner of this listing!" });
        }
        Object.assign(listing, req.body); // this will make the non-edited fields stay as is without needing to enter them all in again
        await listing.save();
        res.status(200).json(listing);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete listing (verified host)
router.delete("/:id", verifyToken, verifyHost, async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ error: "Listing not found" });
        }
        if (listing.owner.toString() !== req.user._id.toString()) {
            // only owner of listing can delete
            return res.status(401).json({ error: "Unauthorized" });
        }
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Listing removed" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
