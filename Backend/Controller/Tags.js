const Tag = require("../Models/Tag");



exports.CreateTag =async(req ,resp)=>{

    try{

        const {name,description} = req.body;

        if(!name || !description){
            return resp.status(400).json({
                success:false,
                message:"All fields required",
            })
        }

        // create entry in db
        const tagDetail = await Tag.create({
            name:name,
            description:description,
        })
        console.log(tagDetail);

        return resp.status(200).json({
            success:true,
            message:"Tag Created Succesfull",
        })

    }catch(err){
        return resp.status(500).json({
            success:false,
            message:"Failed to create Tag "+err.message,
        })
    }
}



// get All tags 

exports.shoeAllTags = async (req , resp)=>{

    try{

        const allTags = await Tag.find({},{name:true,description:true});

        // return response 
        return resp.status(200).json({
            success:true,
            message:"all tags return succcessfully",
            allTags,
        })

    }catch(err){
        return resp.status(400).json({
            success:false,
            message:"Failed to get all tags",
        })
    }
}