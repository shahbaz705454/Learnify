const express = require("express")
const router = express.Router()
const { contactUs } = require("../Controller/ContactUs");

router.post("/contact", contactUs)

module.exports = router;