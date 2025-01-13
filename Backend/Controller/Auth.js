const User = require("../Models/User");
const OTP = require("../Models/OTP");
const Profile = require("../Models/Profile"); // Add this line to import the Profile model
const optGenarator = require('otp-generator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../Utils/mailSender");
const passwordUpdatedTemplate = require("../mail/PasswordUpdate");
require("dotenv").config();

// send OTP
exports.sendOTP = async (req, resp) => {
    try {
        //fetch email from req body
        const { email } = req.body;

        // check user already present or not
        const checkUserPresent = await User.findOne({ email });

        if (checkUserPresent) {
            return resp.status(401).json({
                success: false,
                message: "User Already registered",
            });
        }

        // generate OTP
        var otp = optGenarator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        console.log("otp generated ->", otp);

        // check unique otp or not 
        const result = await OTP.findOne({ otp: otp });
        while (result) {
            otp = optGenarator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });

            result = await OTP.findOne({ otp: otp });
        }

        const otpPayload = { email, otp };

        // create an entry in db for otp
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        return resp.status(200).json({
            success: true,
            message: "OTP Created Successfully",
            otp,
        });

    } catch (err) {
        console.log(err);
        return resp.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// signUp
exports.signUp = async (req, res) => {
    try {
        // Destructure fields from the request body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } = req.body;

        // Check if All Details are there or not
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).send({
                success: false,
                message: "All Fields are required",
            });
        }

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match. Please try again.",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please sign in to continue.",
            });
        }

        // Find the most recent OTP for the email
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (response.length === 0) {
            // OTP not found for the email
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            });
        } else if (otp !== response[0].otp) {
            // Invalid OTP
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the Additional Profile For User
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });

        // Create the user
        let approved = "";
        approved === "Instructor" ? (approved = false) : (approved = true);

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType: accountType,
            approved: approved,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`, 
        });

        return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully",
        });
    } catch (error) {
        console.error("Error during user registration:", error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again.",
        });
    }
};

// login
exports.login = async (req, resp) => {
    try {
        // get data from req body
        const { email, password } = req.body;

        // validate user 
        if (!email || !password) {
            return resp.status(403).json({
                success: false,
                message: "All fields required",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return resp.status(401).json({
                success: false,
                message: "User Not Found ",
            });
        }

        // create jwt Token
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            user.token = token;
            user.password = undefined;

            // create Cookie and send response 
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            resp.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
            });
        } else {
            return resp.status(401).json({
                success: false,
                message: "Password Is Incorrect",
            });
        }
    } catch (err) {
        console.log(err);
        return resp.status(500).json({
            success: false,
            message: "Login Failed, Please try Again !",
        });
    }
};

// change Password
exports.changePassword = async (req, resp) => {
    try {
        const { email, oldPassword, newPassword, confirmNewPassword } = req.body;

        // validate input
        if (!email || !oldPassword || !newPassword || !confirmNewPassword) {
            return resp.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // check if new passwords match
        if (newPassword !== confirmNewPassword) {
            return resp.status(400).json({
                success: false,
                message: "New passwords do not match",
            });
        }

        // find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return resp.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // check if old password is correct
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return resp.status(401).json({
                success: false,
                message: "Old password is incorrect",
            });
        }

        // hash new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // update user's password
        user.password = hashedNewPassword;
        await user.save();
        const emailContent = passwordUpdatedTemplate(email, user.firstName);
        await mailSender(email, "Password Changed", emailContent);
        // send email notification
        await mailSender(email, "Password Changed", "Your password has been changed successfully.");

        return resp.status(200).json({
            success: true,
            message: "Password changed successfully",
        });
    } catch (err) {
        console.log(err);
        return resp.status(500).json({
            success: false,
            message: "Failed to change password",
        });
    }
};