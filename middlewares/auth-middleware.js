const {StatusCodes} = require('http-status-codes');
const BaseError = require("../errors/BaseError");
const {verifyAccessToken} = require("../utils/jwt")

function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(StatusCodes.UNAUTHORIZED).send(getErrorResponse(new BaseError("Access denied")));
    try {
        const decoded = verifyAccessToken(token);
        req.authUserId = decoded.userId;
        next();
    } catch (error) {
        next(error)
    }
}

module.exports = verifyToken;