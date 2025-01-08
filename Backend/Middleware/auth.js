const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../Models/User");


// auth
exports.auth = async (req, resp, next) => {
    try {

        // extract token
        const token = req.cookies.token || req.body.token ||req.header("Authorisation").replace("Bearer","");

        // if token is missing 
        if(!token){
            return resp.status(401).json({
                success:false,
                message:"Token is missing",
            })
        }

        // verify token 

        try{
            const decode = await jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user =decode;



        }catch(error){

            return resp.status(401).json({
                success:false,
                message:"invalid Token"
            })

        }

        next();

    } catch (err) {
        return resp.status(500).json({
            success:false,
            message:"SomeThing Went Wrong while validating the token",
        })

    }
}




// isStudent
exports.isStudent =async (req ,resp)=>{

    try{

        if(req.user.accountType !== "Student"){
           return resp.status(401).json({
            success:false,
            message:"This is student protected route",
           })

        }
        next();

    }catch(err){
        return resp.status(500).json({
            success:false,
            message:"User role can not verified",
        })

    }

}




// isInstructor
exports.isInstructor =async (req ,resp)=>{

    try{

        if(req.user.accountType !== "Instructor"){
           return resp.status(401).json({
            success:false,
            message:"This is instructor proctcted route",
           })

        }
        next();

    }catch(err){
        return resp.status(500).json({
            success:false,
            message:"User role can not verified",
        })

    }

}



// isAdmin

exports.isAdmin =async (req ,resp)=>{

    try{

        if(req.user.accountType !=="Admin"){
           return resp.status(401).json({
            success:false,
            message:"This is Admin proctected route",
           })

        }
        next();

    }catch(err){
        return resp.status(500).json({
            success:false,
            message:"User role can not verified",
        })

    }

}


