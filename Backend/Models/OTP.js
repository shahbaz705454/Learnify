const mongoose =require("mongoose");
const mailSender = require("../Utils/mailSender");
const otpTemplate = require("../mail/emailVerificationTemplate");
const otpTemplate = require("../mail/emailVerificationTemplate");



const OTPSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,

    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
}) 


// a function -> to send email


// Use the email verification template to send the OTP email
async function sendVerificationEmail(email,otp){
    try{

        const mailResponse = await mailSender(email,"Verification Email From Learnify",otpTemplate(otp));
        console.log("Email send Succesfully",mailResponse)

    }catch(err){
        console.log("Error occured while sending mail",err);
        throw err;
    }
}

OTPSchema.pre("save",async function (next) {
    await sendVerificationEmail(this.email,this.otp);
    next();
    
})



module.exports = mongoose.model("OTP",OTPSchema);