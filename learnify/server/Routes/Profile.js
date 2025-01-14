const express = require("express");
const router = express.Router();

const { updateProfile, deleteAccount, getAllUserDetails, updateDisplayPicture, getEnrolledCourses, instructorDashboard } = require("../Controller/Profile");
const { auth, isInstructor } = require("../Middleware/auth"); // Corrected import statement

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

router.delete("/deleteProfile", auth, deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getAllUserDetails);
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);

module.exports = router;