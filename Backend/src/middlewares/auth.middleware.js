const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

async function authUser(req, res, next) {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({
            message: "Unauthorized, token not provided"
        })
    }

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token });

    if(isTokenBlacklisted) {
        return res.status(401).json({
            message: "Token is Invalid"
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;   //decoded will be stored in a new property called user in the request object and we can access it in any controller where we want to get the details of the currently logged in user.
        next();
    } catch(err) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

module.exports = {authUser};