const Tag = require("../Models/Category");



exports.CreateCategory =async(req ,resp)=>{

    try{

        const {name,description} = req.body;

        if(!name || !description){
            return resp.status(400).json({
                success:false,
                message:"All fields required",
            })
        }

        // create entry in db
        const CategoryDetail = await Tag.create({
            name:name,
            description:description,
        })
        console.log(CategoryDetail);

        return resp.status(200).json({
            success:true,
            message:"Category Created Succesfull",
        })

    }catch(err){
        return resp.status(500).json({
            success:false,
            message:"Failed to create Category "+err.message,
        })
    }
}



// get All tags 

exports.showAllCategory = async (req , resp)=>{

    try{

        const allcategory = await Tag.find({},{name:true,description:true});

        // return response 
        return resp.status(200).json({
            success:true,
            message:"all Category return succcessfully",
            allTags,
        })

    }catch(err){
        return resp.status(400).json({
            success:false,
            message:"Failed to get all Category",
        })
    }
}