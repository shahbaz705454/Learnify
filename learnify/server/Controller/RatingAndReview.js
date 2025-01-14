const RatingAndReview = require("../Models/RatingAndReview");
const Course = require("../Models/Course");
const { mongo, default: mongoose } = require("mongoose");




exports.createRating = async (req, resp) => {
    try {

        // get user id
        const userId = req.user.id;

        // fetch data from req body

        const { rating, review, courseId } = req.body;

        // check if user is enrolled or not
        const courseDetail = await Course.findById(
            {
                _id: courseId,
                studentsEnrolled: { $elemMatch: { $eq: userId } }
            });

        if (!courseDetail) {
            return resp.status(403).json({
                status: false,
                message: "Student is not enrolled in the course",
            })
        }

        // check user already given review or not
        const alreadyReviewed = await RatingAndReview.findOne({ user: userId, course: courseId });
        if (alreadyReviewed) {
            return resp.status(403).json({
                status: false,
                message: "coures is already reviewed by the user",
            })

        }
        // /create rating and review 
        const ratingReview = await RatingAndReview.create({
            user: userId,
            rating: rating,
            coures: courseId,
            review: review,
        })
        // update course with the rating and review 

        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    ratingAndReviews: ratingReview._id,
                }
            },
            { new: true }
        )

        console.log(updatedCourseDetails);

        // return response
        return resp.status(200).json({
            success: true,
            message: 'Rating and review created Succesfuully',
            ratingReview,
        })



    } catch (err) {
        console.log(err);
        return resp.status(500).json({
            success: false,
            message: "falied to create rating and review"
        })

    }
}


exports.getAverageRating = async (req, res) => {
    try {
        // Get course ID
        const courseId = req.body.courseId;
        console.log("Received courseId:", courseId);

        // Calculate average rating
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    coures: new mongoose.Types.ObjectId(courseId), // Correct field name
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                },
            },
        ]);

        console.log("Aggregation Result:", result);

        // Return rating
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            });
        }

        // If no ratings/reviews exist
        return res.status(200).json({
            success: true,
            message: "Average Rating is 0, no ratings given till now",
            averageRating: 0,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// get all Rating 

exports.getAllRating = async (req, resp) => {

    try {


        const allReviews = await RatingAndReview.find({})
            .sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email image",

            })
            .populate({
                path: "course",
                select: "courseName",

            })
            .exec();

            return resp.status(200).json({
                success:true,
                message:"All review fetched Successfully",
                data:allReviews,
            })


    } catch (err) {

        console.log(err);
        return resp.status(500).json({
            success: false,
            message: "falied to get All Rating And Reviews"+err.message,
        })
    }
}