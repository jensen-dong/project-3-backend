const User = require("../models/User");

const verifyHost = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user.isHost) {
            return res.status(401).json({ error: "Host privileges required." });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = verifyHost;
