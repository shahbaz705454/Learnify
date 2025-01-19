const  mailSender  = require("../Utils/mailSender");
const {contactUsEmail} = require("../mail/contactUsEmail");

exports.contactUs = async (req, resp) => {


  const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
  console.log(req.body)
  try {
    const emailRes = await mailSender(
      email,
      "Your Data send successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    )
    console.log("Email Res ", emailRes)
    return resp.status(200).json({
      success: true,
      message: "Email send successfully",
    })
  } catch (error) {
    console.log("Error", error)
    console.log("Error message :", error.message)
    return resp.status(500).json({
      success: false,
      message: `Something went wrong...${error.message}`,
    })
  }
}




