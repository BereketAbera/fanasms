
const CONSTANTS = require("../../constant.js");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcryptjs = require("bcryptjs");

function isAuthenticated(req, res, next) {
    let token = getTokenFromHeader(req);
    if (token) {
        verify(token)
            .then(payload => {
                let user = {
                    id: payload.sub,
                    role: payload.role,
                    sellerProfileId: payload.key
                };
                req["user"] = user;
                next();
            })
            .catch(function (error) {
                res.status(401).send("UnAuthorized");
            });
    } else {
        res.status(401).send("Unauthorized");
    }
}

function getTokenFromHeader(req) {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        return req.headers.authorization.split(" ")[1];
    }
    return null;
}

function verify(token) {
    var verifyOptions = {
        expiresIn: "30d",
        algorithm: ["RS256"]
    };
    return new Promise((resolve, reject) => {
        jwt.verify(token, CONSTANTS.JWTSECRET, verifyOptions, (err, decodedToken) => {
            if (err || !decodedToken) {
                return reject(err);
            }

            resolve(decodedToken);
        });
    });
}

module.exports = {
    isAuthenticated,
    getTokenFromHeader,
    verify,
  };