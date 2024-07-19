const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Listing = require("../models/Listing");
const verifyToken = require("../middleware/verify-token");
const mongoose = require("mongoose");

// Get user profile
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // convert user to json and prep to be modified and add listings to json
    const profile = user.toJSON();
    if (user.isHost) {
      const listings = await Listing.find({ owner: req.user._id });
      profile.listings = listings;
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put("/", verifyToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
