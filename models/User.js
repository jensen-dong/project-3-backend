const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); //Doesn't seem to be needed for JWT, but this was here for the Express Auth.

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
});

// Remove hashedPassword from being viewed in Postman/Console/Route, whatever.
userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject.hashedPassword;
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
