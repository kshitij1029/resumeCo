require("dotenv").config(); //whatever variable we will be creating in .env file we can access them anywhere in our express server.

const app = require("./src/app");
const connectDB = require("./src/config/database");
const invokeGeminiAi = require("./src/services/ai.service");

connectDB();


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});  