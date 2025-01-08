const User = require("../Models/User");
const mailSender = require("../Utils/mailSender");
const bcrypt = require("bcrypt");



// reset password token

exports.resetPasswordToken = async (req, resp) => {
    try {

        const { email } = req.body;

        // check user for the email 
        const user = await User.findOne({ email });
        if (!user) {
            return resp.status(401).json({
                success: false,
                message: "Your email is not registered with us, try Again",
            })
        }

        // generate Token
        const token = crypto.randomUUID();
        // /update user by adding token and expiration time

        const updateDetail = await User.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000,
            },
            { new: true });



        // create Url

        const url = `http://localhost:3000/update-password/${token}`
        // send mail containing the url
        await mailSender(email, "Password Reset Link", `Password Reset Link : ${url}`);
        // return response 
        return resp.status(200).json({
            success: true,
            message: "Email send successfully,Please Check Email and Change Password"
        })



    } catch (err) {
        console.log(err);
        return resp.status(500).json({
            success: false,
            message: "something went wrong while resetting the Password"
        })

    }
}


// Reset Passwords
exports.resetPassword = async (req, resp) => {
    try {

        // data fetch
        const { password, confirmPassword, token } = req.body;
        // validation

        if (password !== confirmPassword) {
            return resp.status(401).json({
                success: false,
                message: "Password Do not match",
            })
        }
        // get userDetail from db using token

        const userDetail = await User.findOne({ token: token });

        // if no entry -invalid token 

        // token time check
        if (userDetail.resetPasswordExpires > Date.now()) {
            return resp.status(401).json({
                success: false,
                message: "Link Expired, please try Again",
            })
        }

        // hash password\

        const hashPassword = await bcrypt.hash(password, 10);

        // Password Update 
        await User.findByIdAndUpdate(
            { token: token },
            { password: hashPassword },
            { new: true },)
        // return response

        return resp.status(200).json({
            success: true,
            message: "Password Reset Successfull.",
        })

    } catch (err) {

        return resp.status(500).json({
            success: false,
            message: "something went wrong while resetting the Password"
        })

    }
}