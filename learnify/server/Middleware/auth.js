const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../Models/User");

// auth middleware
exports.auth = async (req, resp, next) => {
    try {
        // extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

        // if token is missing 
        if (!token) {
            return resp.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        // verify token 
        try {
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        } catch (error) {
            return resp.status(401).json({
                success: false,
                message: "Invalid Token"
            });
        }

        next();
    } catch (err) {
        return resp.status(500).json({
            success: false,
            message: "Something went wrong while validating the token",
        });
    }
};

// isAdmin middleware
exports.isAdmin = async (req, resp, next) => {
    try {
        console.log("user role", req.user.accountType);
        if (req.user.accountType !== "Admin") {
            return resp.status(401).json({
                success: false,
                message: "This is an Admin protected route",
            });
        }
        next();
    } catch (err) {
        return resp.status(500).json({
            success: false,
            message: "User role cannot be verified",
        });
    }
};

// isStudent middleware
exports.isStudent = async (req, resp, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return resp.status(401).json({
                success: false,
                message: "This is a student protected route",
            });
        }
        next();
    } catch (err) {
        return resp.status(500).json({
            success: false,
            message: "User role cannot be verified",
        });
    }
};

// isInstructor middleware
exports.isInstructor = async (req, resp, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return resp.status(401).json({
                success: false,
                message: "This is an instructor protected route",
            });
        }
        next();
    } catch (err) {
        return resp.status(500).json({
            success: false,
            message: "User role cannot be verified",
        });
    }
};