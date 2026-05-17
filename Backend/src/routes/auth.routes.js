//All Api's related to authentication will be defined here.

const express = require("express");
const authRouter = express.Router();     //essentially a mini Express application that you can attach to your main app.It helps you organize routes and middleware into separate files or modules, making your code cleaner and easier to maintain.
const authController = require("../controllers/auth.controller");  
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerUserController)

/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access Public
 */
authRouter.post("/login", authController.LoginUserController)


/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access Public
 */
authRouter.get("/logout", authController.logoutUserController)


/**
 * @route GET /api/auth/get-me
 * @description get user details of current logged in user
 * @access Private
 */
authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController)

module.exports = authRouter;