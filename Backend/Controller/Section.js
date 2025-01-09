const Course = require("../Models/Course");
const Section = require("../Models/Section")
const subSection = require("../Models/SubSection");

exports.createSection = async (req, resp) => {

    try {

        // fetch data
        const { courseId, sectionName } = req.body;
        // validate data
        if (!courseId || !sectionName) {
            return resp.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        // check if course exists
        const existingCourse = await Course.findById(courseId);
        if (!existingCourse) {
            return resp.status(400).json({
                success: false,
                message: "Invalid Course",
            })
        }

        // create Section
        const newSection = await Section.create({
            sectionName,
        })

        const updateCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id,
                },
            },
            { new: true }
        ).populate({
            path: 'courseContent',
            populate: {
                path: 'subSections',
                model: 'SubSection'
            }
        });


        // return response 

        return resp.status(200).json({
            success: true,
            message: "Section Created Successfully",
            updateCourse
        })







    } catch (err) {

        return resp.status(500).json({
            success: false,
            message: "Failed to create Section",
        })


    }
}


exports.updateSection = async (req, resp) => {


    try {


        // fetch Data
        const { sectionName, sectionId } = req.body;

        // data validation
        if (!sectionName || !sectionId) {
            return resp.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // update Data 

        const updatedData = await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true });


        // return response 
        return resp.status(200).json({
            success: true,
            message: "section Update Successfull",
        })



    } catch (err) {

        return resp.status(500).json({
            success: false,
            message: "Failed to Update Section",
        })


    }

}


exports.deleteSection = async (req, resp) => {
    try {
           
        // fetch section id 
        const {sectionId} = req.body;

        // delete section

        await Section.findByIdAndDelete(sectionId);


        // /return response 

        return resp.status(200).json({
            success:true,
            message:"Sections delete succesfull",
        })



    } catch (err) {

        return resp.status(500).json({
            success: false,
            message: "Failed to create Section",
        })



    }
}