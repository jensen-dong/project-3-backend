const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

//Mongo Connection
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

//MW
app.use(express.json());
app.use(cors());

//Controllers
const testJWTRouter = require("./controllers/test-jwt");
const usersRouter = require("./controllers/users");
const profilesRouter = require("./controllers/profiles");
const listingsRouter = require("./controllers/listings");
// const reviewsRouter = require("./controllers/reviews")
const bookingsRouter = require("./controllers/bookings");

//Routes
app.use("/test-jwt", testJWTRouter);
app.use("/users", usersRouter);
app.use("/profiles", profilesRouter);
app.use("/listings", listingsRouter);
// app.use("reviews", reviewsRouter)
app.use("/bookings", bookingsRouter);

//Listen
app.listen(3000, () => {
    console.log("The express app is ready!");
});
