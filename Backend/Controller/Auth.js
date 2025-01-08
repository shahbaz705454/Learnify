const User = require("../Models/User");
const OTP = require("../Models/OTP");
const optGenarator = require('otp-generator')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../Utils/mailSender");
require("dotenv").config();

// send OTP

exports.sendOTP = async (req, resp) => {
    try {

        //fetch email from req body

        const { email } = req.body;

        // check user already pressent or not
        const checkUserPresent = await User.findOne({ email });

        if (checkUserPresent) {
            return resp.status(401).json({
                success: false,
                message: "User Already registered",
            })
        }

        // generate OTP
        var otp = optGenarator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        })

        console.log("otp generatred ->", otp);

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
        })



    } catch (err) {

        console.log(err);
        return resp.status(500).json({
            success: false,
            message: err.message,
        });

    }
}

// signUp

exports.signUp = async (req, resp) => {
    try {

        // fetch detail from req body
        const { firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp
        } = req.body;


        // validate 
        if (!firstName || !lastName || !password || !confirmPassword || !otp) {
            return resp.status(403).json({
                success: false,
                message: "All filds are required",
            })

        }


        // pass match 
        if (password !== confirmPassword) {
            return resp.status(400).json({
                success: false,
                message: 'Password Does not Match'
            });
        }

        // check user alresy exists 
        const checkUserPresent = await User.findOne({ email });
        if (checkUserPresent) {
            return resp.status(400).json({
                success: false,
                message: "User Is Already Present",
            })
        }


        // find most reecent otp stored for the user
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (recentOtp.length == 0) {
            // otp not found
            return resp.status(400).json({
                success: false,
                message: "OTP Not Found",
            })

        } else if (otp !== recentOtp) {
            // invalid otp
            return resp.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        // hash Password

        const hashPassword = await bcrypt.hash(password, 10);

        // create a dummy prfile 
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        })


        // create entry in db 

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        return resp.status(200).json({
            success: true,
            message: " User Created Successfully",
            user,
        })



    } catch (err) {
        console.log(err)
        return resp.status(500).json({
            success: false,
            message: "Failed to create user",
        })



    }



}


// login
exports.login = async (req, resp) => {
    try {


        // get data from req body

        const { email, password } = req.body;

        // validate user 

        if (!email || !password) {
            return resp.status(403).josn({
                success: false,
                message: "All fields required",
            })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return resp.status(401).json({
                success: false,
                message: "User Not Found ",
            })
        }

        // create jwt Token
        if (await bcrypt.compare(password, user.password)) {

            const payload = {
                email: user.email,
                id: user._id,
                role: user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            user.token = token;
            user.password = undefined;




            // create Cookie and send response 
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }


            resp.cookie("toke", toke, options).status(200).json({
                success: true,
                token,
                user,

            })

        }else{
            return resp.status(401).json({
                success:false,
                message:"Password Is Incorrect",
            });
        }






    } catch (err) {
        console.log(err);
        return resp.status(500).json({
            success:false,
            message:"Login Failed, Please try Again !",
        })

    }
}


// change Password

exports.changePassword =async (req ,resp)=>{
    try{
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

        // send email notification
        await mailSender(email, "Password Changed", "Your password has been changed successfully.");

        return resp.status(200).json({
            success: true,
            message: "Password changed successfully",
        });
      


    }catch(err){

        console.log(err);
        return resp.status(500).json({
            success: false,
            message: "Failed to change password",
        });

    }
}