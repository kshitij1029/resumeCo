//Mongoose connection has been established in this file and then sxported to server.js file where we will call this function to connect to the database before starting the server. This way we can ensure that our server is only started after a successful connection to the database has been established.

const mongoose = require("mongoose");

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URI,)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = connectDB;