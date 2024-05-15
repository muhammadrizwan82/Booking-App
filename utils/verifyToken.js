import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {

    const token = req.cookies.access_token
    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.JWTSecret, (err, user) => {

        if (err) return next(createError(403, "Invalid Token"));

        req.user = user
        next();
    });
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id | req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "you are not authorize"));
        }
    })
}

export const verifyAdmin = (req, res, next) => {

    verifyToken(req, res, () => {

        if (req.user.isAdmin) {
            next();

        } else {

            return next(createError(403, "you are not authorize, only admin can make changes"));
        }
    })
}

