const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
const Listing = require("../models/Listing");
const Booking = require("../models/Booking");

// Create booking
router.post("/", verifyToken, async (req, res) => {
    try {
        const { name, listingId, startDate, endDate } = req.body;
        const listing = await Listing.findById(listingId);
        
        if (!listing) {
            return res.status(404).json({ error: "Listing not found." });
        }
        if (listing.isBooked) {
            return res.status(400).json({ error: "Listing is already booked." });
        }
        const newBooking = new Booking({
            name,
            listing: listingId,
            user: req.user._id,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
        });
        await newBooking.save();
        listing.isBooked = true;
        await listing.save();
        res.status(201).json(newBooking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// View all bookings made by user
router.get("/mybookings", verifyToken, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id });
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// View all bookings by id
router.get("/:id", verifyToken, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate("listing", "title description price location images")
            .populate("user", "username email");

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Cancel/delete booking
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found." });
        }
        if (booking.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "This is not your booking!" });
        }
        const listing = await Listing.findById(booking.listing);
        if (listing) {
            listing.isBooked = false;
            await listing.save();
        }
        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Booking cancelled." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
