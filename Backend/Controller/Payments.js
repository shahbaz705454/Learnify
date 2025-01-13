const { default: mongoose } = require("mongoose");
const { instance } = require("../Config/razorpay");
const Course = require("../Models/Course");
const User = require("../Models/User");
const mailSender = require("../Utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/courseEnrollmentTemplate");
const crypto = require("crypto"); // Ensure crypto is imported

// capture the payment and initiate razorpay order
exports.capturePayment = async (req, resp) => {
    // get course id and userID
    const { course_id } = req.body;
    const userId = req.user.id;

    // validation
    if (!course_id) {
        return resp.status(400).json({
            success: false,
            message: "Please provide valid course ID",
        });
    }

    let course;
    try {
        course = await Course.findById(course_id);
        if (!course) {
            return resp.status(400).json({
                success: false,
                message: "course detail not found",
            });
        }

        // check user already pay for the same course
        const uid = new mongoose.Types.ObjectId(userId);
        if (course.studentsEnrolled.includes(uid)) {
            return resp.status(403).json({
                success: false,
                message: "course already purchased",
            });
        }
    } catch (err) {
        return resp.status(403).json({
            success: false,
            message: err.message,
        });
    }

    // order Create
    const amount = course.price;
    const currency = "INR";

    const options = {
        amount: amount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes: {
            course_id,
            userId,
        },
    };

    try {
        // initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);
        return resp.status(200).json({
            success: true,
            courseName: course.courseName,
            courseDescription: course.courseDescription,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount,
        });
    } catch (err) {
        return resp.json({
            success: false,
            message: err.message,
        });
    }
};

exports.verifyPayment = async (req, resp) => {
    const webhookSecret = "12345678";
    const signature = req.headers["x-razorpay-signature"];
    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (signature === digest) {
        console.log("Payment is Authorised");

        try {
            const { userId, courseId } = req.body.payload.payment.entity.notes;
            const enrolledCourse = await Course.findByIdAndUpdate(
                { _id: courseId },
                {
                    $push: {
                        studentsEnrolled: userId,
                    },
                },
                { new: true }
            );

            if (!enrolledCourse) {
                return resp.status(500).json({
                    success: false,
                    message: "Course not Found",
                });
            }
            console.log(enrolledCourse);
            const enrolledStudent = await User.findByIdAndUpdate(
                { _id: courseId },
                {
                    $push: {
                        courses: courseId,
                    },
                },
                { new: true }
            );
            console.log(enrolledStudent);

            // send mail of confirmation
            const emailResponse = await mailSender(
                enrolledStudent.email,
                "Congratulations, You Are Onboarded into New Learnify Course",
                courseEnrollmentEmail(enrolledCourse.courseName, enrolledStudent.firstName)
            );

            return resp.status(200).json({
                success: true,
                message: "Course Payment successful, student Enrolled In the Course",
            });
        } catch (err) {
            return resp.status(500).json({
                success: false,
                message: "Failed to purchase the course " + err.message,
            });
        }
    } else {
        return resp.status(400).json({
            success: false,
            message: "Invalid signature",
        });
    }
};