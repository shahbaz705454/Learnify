const Category = require("../Models/Category");


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
        const CategoryDetail = await Category.create({
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

        const allCategory = await Category.find({},{name:true,description:true});

        // return response 
        return resp.status(200).json({
            success:true,
            message:"all Category return succcessfully",
            allCategory,
        })

    }catch(err){
        return resp.status(400).json({
            success:false,
            message:"Failed to get all Category",
        })
    }
}

// category page detail

exports.categoryPageDetails =async (req,resp )=>{
    try{

        // get category id
        const  {categoryId} =req.body;
        // get courses fro special category

        const selectedCategory = await Category.findById({categoryId}).populate("courses").exec();
        // validation
        // get course for different category
        // get top selling course 

        
    }catch(err){
        console.log(err);
        return resp.status(500).json({
            success:false,
            message:"falied to create rating and review"
        })
    }
}
