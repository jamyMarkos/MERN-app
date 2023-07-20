require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const workoutRoutes = require("./routes/workouts");

const port = process.env.PORT || 4000;
const uri = process.env.MONGO_URI;
// express app
const app = express();

app.use(express.json());

/* 
    * CORS middleware - allows cross-origin resources sharing.
    - npm i cors (can be used instead of proxy to resolve CORS error)

*/
app.use(
    cors({
        allowedHeaders: ["Content-Type"],
        origin: "*",
        preflightContinue: true,
    })
);

// connect to db
mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // listen for requests
        app.listen(port, () => {
            console.log("connected to db & listening on port", port);
        });
    })
    .catch((error) => {
        console.log(error.message);
    });

// middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use("/api/workouts", workoutRoutes);
