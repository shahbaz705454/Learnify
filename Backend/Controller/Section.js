const Course = require("../Models/Course");
const Section = require("../Models/Section")
const subSection = require("../Models/SubSection");

exports.createSection = async (req, res) => {
    try {
        const { sectionName, courseId } = req.body;

        // create Section
        const newSection = await Section.create({
            sectionName,
        });

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
                model: 'SubSection',
            },
        });

        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            course: updateCourse,
        });
    } catch (error) {
        console.error("Error creating section:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create section" + error.message,
        });
    }
};

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