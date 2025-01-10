const Profile= require("../Models/Profile");
const User = require("../Models/User");
const Course =require("../Models/Course");



exports.updateProfile =async( req,resp)=>{

    try{

        const {gender,dateOfBirth="",about="",contactNumber} = req.body;


        const Id = req.user.id;
        // validation

        if(!contactNumber || !gender || !Id){
            return resp.status(403).json({
                success:false,
                message:"All fields are required in Profile",
            })
        }

        // find profile 
        const userDetail = await User.findById(Id);
        const profileId = userDetail.additionalDetails;
        const profileDetail = await Profile.findById(profileId);

        // update detail 
        profileDetail.dateOfBirth =dateOfBirth;
        profileDetail.about=about;
        profileDetail.gender=gender;
        profileDetail.contactNumber=contactNumber;
        await profileDetail.save();

        // return response 
        return resp.status(200).json({
            success:true,
            message:"Profile Updated successfully"
        })



    }catch(err){
        return resp.status(500).json({
            success: false,
            message: "Failed to update Profile",
        });
    }




}

// delete account 
exports.deleteAccount =async(req,resp)=>{
    try{

        const id =req.user.id;

        // validate
        if(!id){
            return resp.status(200).json({
                success:false,
                message:"Id is not correct",
            })
        }

        const userDetail = await User.findById(id);
        const profileId = userDetail.additionalDetails;

        await Profile.findByIdAndDelete({_id:profileId});
        // Unroll user from all enrolled courses
        await Course.updateMany(
            { studentsEnrolled: id },
            { $pull: { studentsEnrolled: id } }
        );
        await User.findByIdAndDelete(id);
      

        return resp.status(200).json({
            success:true,
            message:"Profile and user deleted Successfully."
        })

    }catch(err){

        return resp.status(500).json({
            success: false,
            message: "Failed to delete Profile and User",
        });

    
    }
}


exports.getAllUserDetails =async(req, resp)=>{
    try{

        const id  = req.user.id;

        const userDetails = await User.findById({_id:id}).populate("additionalDetails");

        return resp.status(200).json({
            success:true,
            message:"Fetch user detail successfull",
            userDetails,
        })

    }catch(err){
        return resp.status(500).json({
            success: false,
            message: "Failed to delete Profile and User",
        });

        
    }
}