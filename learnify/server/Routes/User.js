const express = require("express");
const route = express.Router();

const {sendOTP,signUp,login,changePassword} = require("../Controller/Auth");
const {resetPasswordToken,resetPassword}= require("../Controller/ResetPassword");
const {auth} = require("../Middleware/auth");

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
route.post("/login", login)

// Route for user signup
route.post("/signup", signUp)

// Route for sending OTP to the user's email
route.post("/sendotp", sendOTP)

// Route for Changing the password
route.post("/changepassword", auth, changePassword)



// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
route.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
route.post("/reset-password", resetPassword);


module.exports = route;
