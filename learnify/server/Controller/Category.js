const Category = require("../Models/Category");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }



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

        const allCategory = await Category.find({});

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

exports.categoryPageDetails =async (req,res)=>{
    try {
      const { categoryId } = req.body
      console.log("PRINTING CATEGORY ID: ", categoryId);
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()
  
      //console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCategory.courses.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })
      let differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec()
        //console.log("Different COURSE", differentCategory)
      // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
       // console.log("mostSellingCourses COURSE", mostSellingCourses)
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
}
