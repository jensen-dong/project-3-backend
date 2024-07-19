const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const SALT_LENGTH = 12;


router.post("/signup", async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ username: req.body.username });
        if (userInDatabase) {
            return res.status(400).json({ error: "Username already taken." });
        }
        const userByEmail = await User.findOne({ email: req.body.email });
        if (userByEmail) {
            return res.status(400).json({ error: "Email already in use." });
        }
        const user = new User({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, SALT_LENGTH),
            phone_number: req.body.phone_number,
            bio: req.body.bio,
            address: req.body.address,
            isHost: req.body.isHost || false,
        });
        const savedUser = await user.save();
        const token = jwt.sign({ username: savedUser.username, _id: savedUser._id, isHost: savedUser.isHost }, process.env.JWT_SECRET);
        res.status(201).json({ user: savedUser, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.post("/signin", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign(
                    { username: user.username, _id: user._id, isHost: user.isHost },
                    process.env.JWT_SECRET
                );
                res.status(200).json({ token });
            } else {
                res.status(401).json({ error: "Invalid username or password." });
            }
        } else {
            res.status(401).json({ error: "Invalid username or password." });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
