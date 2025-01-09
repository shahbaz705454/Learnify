const Section = require("../Models/Section");
const subSection = require("../Models/SubSection");
require("dotenv").config();
const {uploadImageToCloudinary} = require("../Utils/ImageUpload")








// create sub secti\on

exports.createSubSection = async (req, resp)=>{

    try{
        // fetch data from req body
        const {sectionId,title,timeDuration ,description} = req.body;
        // fetch file from body

        const video = req.files.videoFile;


        // validdation
        if (!sectionId || !title || !timeDuration || !description || !video) {
            return resp.status(400).json({
            success: false,
            message: "All fields are required",
            });
        }
        // upload video to cloudinary 

        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        // create a subsection


        const subsectionDetail = await subSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })
        // update section with this subsection

        const updateSection = await Section.findByIdAndUpdate(
            {_id: sectionId},
            {
            $push: {
                subSection: subsectionDetail._id,
            }
            },
            {new: true},
        ).populate('subSection');

        console.log(updateSection);


        // return response

        return resp.status(200).json({
            success:true,
            message:"Sub Section Is created",
            updateSection,
        })
        
    }catch(err){

        return resp.status(500).json({
            success: false,
            message: "Failed to create Section",
        })
            
    }
}

// update sub-section
exports.updateSubSection =async(req,resp)=>{
    try {
        const { subSectionId, title, timeDuration, description } = req.body;

        if (!subSectionId || !title || !timeDuration || !description) {
            return resp.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const updatedSubSection = await subSection.findByIdAndUpdate(
            subSectionId,
            {
                title: title,
                timeDuration: timeDuration,
                description: description,
            },
            { new: true }
        );

        if (!updatedSubSection) {
            return resp.status(404).json({
                success: false,
                message: "Sub Section not found",
            });
        }

        return resp.status(200).json({
            success: true,
            message: "Sub Section updated successfully",
            updatedSubSection,
        });
    } catch (err) {
        return resp.status(500).json({
            success: false,
            message: "Failed to update Sub Section",
        });
    }
}


// delete sub section
exports.deleteSubSection =async(req,resp)=>{
    try{
        const { subSectionId } = req.body;

        if (!subSectionId) {
            return resp.status(400).json({
            success: false,
            message: "Sub Section ID is required",
            });
        }
        const { sectionId } = req.body;

        const deletedSubSection = await subSection.findByIdAndDelete(subSectionId);

        if (!deletedSubSection) {
            return resp.status(404).json({
            success: false,
            message: "Sub Section not found",
            });
        }

        await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
            $pull: {
                subSection: subSectionId,
            },
            },
            { new: true }
        );

        return resp.status(200).json({
            success: true,
            message: "Sub Section deleted successfully",
        });
      

    }catch(err){
        return resp.status(500).json({
            success: false,
            message: "Failed to delete Sub Section",
        });
    }
}
