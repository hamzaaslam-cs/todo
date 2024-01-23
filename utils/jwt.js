const {
    JWT_ACCESS_TOKEN_EXPIRE_IN,
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_SECRET,
    JWT_REFRESH_TOKEN_EXPIRE_IN,
    EMAIL_TOKEN_SECRET,
    EMAIL_REFRESH_TOKEN_EXPIRE_IN
} = require("../config/jwt");
const jwt = require('jsonwebtoken');

module.exports = {
    signAccessToken: (userId) => {
        return jwt.sign(
            {},
            ACCESS_TOKEN_SECRET,
            {
                expiresIn: JWT_ACCESS_TOKEN_EXPIRE_IN,
                issuer: "todo",
                audience: String(userId),
            });
    },
    signRefreshToken: (userId) => {
        return jwt.sign(
            {},
            REFRESH_TOKEN_SECRET,
            {
                expiresIn: JWT_REFRESH_TOKEN_EXPIRE_IN,
                issuer: "todo",
                audience: String(userId),
            });
    },

    signEmailToken: (email) => {
        return jwt.sign(
            {email:email},
            EMAIL_TOKEN_SECRET,
            {
                expiresIn: EMAIL_REFRESH_TOKEN_EXPIRE_IN,
                issuer: "todo",
            });
    },


    verifyAccessToken: (token) => {
        return jwt.verify(token, ACCESS_TOKEN_SECRET);
    },
    verifyRefreshToken: (token) => {
        return jwt.verify(token, REFRESH_TOKEN_SECRET);
    },
    verifyEmailToken: (token) => {
        return jwt.verify(token, EMAIL_TOKEN_SECRET);
    }
};
