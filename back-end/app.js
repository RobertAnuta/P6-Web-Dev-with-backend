//mondo connection: mongodb+srv://anutar:<password>@cluster0.ptmajah.mongodb.net/?retryWrites=true&w=majority
//anutar: R@bert123
// R%40bert123

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

const app = express();
try {
    mongoose.connect("mongodb+srv://anutar:R%40bert123@cluster0.ptmajah.mongodb.net/")
        .then(() => {
            console.log("Successfully connected to MongoDB Atlas!");
        });
} catch (error) {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
}

app.use(express.json());

// all types of access
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// app.use(bodyParser.json());

// Serve static files
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
