// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifyPayment } = require("../Controller/Payments")
const { auth, isStudent } = require("../Middleware/auth")
router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifyPayment",auth, isStudent, verifyPayment)


module.exports = router;