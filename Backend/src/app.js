//Use of this File: Creating a server instance using app = express() and using middlewares as well as routes.

const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

/* Using middlewares here: */
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));



/* require all the routes here: */
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

/* Using all routes here */
app.use(cookieParser());
app.use("/api/auth", authRouter);   //whenever we will hit any route starting with /api/auth then it will be handled by authRouter.     
app.use("/api/interview", interviewRouter);   //whenever we will hit any route starting with /api/interview then it will be handled by interviewRouter.     

module.exports = app;