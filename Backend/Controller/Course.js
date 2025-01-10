const Course = require("../Models/Course");
const Category = require("../Models/Category");
const User = require("../Models/User");
const { uploadImageToCloudinary } = require("../Utils/ImageUpload");


// create course

exports.createCourse = async (req, resp) => {
    try {

        const { courseName, courseDescription, whatYouWillLearn, price, category } = req.body;

        // get thumbnail
        const thumbnail = req.file.thumbnail;

        // validation
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail) {
            return resp.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Check if Category exists
        const existingCategory = await Category.findById(category);
        if (!existingCategory) {
            return resp.status(400).json({
                success: false,
                message: "Invalid Category",
            });
        }


        // check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details",instructorDetails);


        if(!instructorDetails){
           return resp.status(404).json({
            success:false,
            message:"Instractor Detail not Found",
           });
        }


        // upload to cloudinary 
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);


        // /create entry in db
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            price,
            whatYouWillLearn:whatYouWillLearn,
            thumbnail:thumbnailImage.secure_url,
            Category:existingCategory._id,
        })


        // add the new course to the user schema of instrauctor 

        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true},
        )



        // update Category schema
        await Category.findByIdAndUpdate(
            {_id: existingCategory._id},
            {
            $push: {
                courses: newCourse._id,
            }
            },
            {new: true},
        );

        return resp.status(200).json({
            success: true,
            message: "Course created successfully",
            data: newCourse,
        });







    } catch (err) {
        return resp.status(400).json({
            success: false,
            message: "Failed to create Course",
        })
    }
}


// get ALl course HAndler function

exports.showAllCourses=async(req ,resp)=>{

    try{

        const allCourse = await Course.find({},{courseName:true,price:true,thumbnail:true,instructor:true,studentsEnrolled:true,ratingAndReviews:true}).populate("instructor").exec();

        return resp.status(200).json({
            success:true,
            message:"All Data For course fetched successfull",
            data:allCourse,
        })


    }catch(err){
        return resp.status(500).json({
            success:false,
            message:"Failed to fecth Data",
        })
    }

}