import foodModel from "../model/foodItem.model.js";
import { LikeModel } from "../model/Likes.model.js";
import FoodModel from "../model/foodItem.model.js";
import { uploadfile } from "../services/storage.service.js";
import fs from "fs";
import saveModel from "../model/saved.model.js";
import commentModel from "../model/comment.model.js";
import UserModel from "../model/user.model.js";
export async function createFood(req, res) {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({
        message: "Name and Description required",
      });
    }
    if (!req.file) {
      return res.status(400).json({
        message: "File is required",
      });
    }
    const result = await uploadfile(req.file.path); //  return object from cloudnery
    const foodItem = await foodModel.create({
      video: result.secure_url,
      name: name,
      description: description,
      foodPartner: req.foodPartner._id,
    });
    fs.unlinkSync(req.file.path); // delete local file
    res.status(201).json({
      message: "Upload successful",
      food: foodItem,
      foodPartner: foodItem.foodPartner,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed" });
  }
}
export async function getFoodItems(req, res) {
  try {
    const foodItems = await foodModel.find();
    return res.status(200).json({
      message: "food item fetch successfully",
      foodItems,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
}
export async function likeFood(req, res) {
  try {
    const { foodId } = req.body;
    const user = req.user;
    const isAllreadyLiked = await LikeModel.findOne({
      user: user._id, // store user id
      food: foodId,
    });
    if (isAllreadyLiked) {
      await LikeModel.deleteOne({
        user: user._id,
        food: foodId,
      });
      await FoodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: -1 },
      });
      return res.status(200).json({
        message: "User unLike the post ",
      });
    }

    const like = await LikeModel.create({
      user: user._id,
      food: foodId,
    });
    await FoodModel.findByIdAndUpdate(foodId, {
      $inc: { likeCount: 1 },
    });
    return res.status(201).json({
      message: "user Like a post !!..",
      liked: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error from " + error,
    });
  }
}
export async function saveFood(req, res) {
  try {
    const { foodId } = req.body; // extract id from frontend
    const user = req.user;
    const isAllreadySaved = await saveModel.findOne({
      user: user._id,
      food: foodId,
    });
    if (isAllreadySaved) {
      await saveModel.deleteOne({
        user: user._id,
        food: foodId,
      });
      const updatedFood = await foodModel.findByIdAndUpdate(
        foodId,
        {
          $inc: { saveCount: -1 },
        },
        { new: true },
      );
      return res.status(200).json({
        message: "Food item unsaved",
        saved: false,
        saveCount: updatedFood.saveCount,
      });
    }

    const save = await saveModel.create({
      user: user._id,
      food: foodId,
    });
    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      {
        $inc: { saveCount: 1 },
      },
      { new: true },
    );
    return res.status(201).json({
      Message: "food item Saved ",
      saved: true,
      saveCount: updatedFood.saveCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error from " + error,
    });
  }
}
export async function getAllSavedFood(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized"
      })
    }

    const user = req.user;
   
    const savedFoods = await saveModel
      .find({ user: user._id })
      .populate("food"); 

    if (!savedFoods || savedFoods.length === 0) {
      return res.status(404).json({
        message: "No saved food found"
      })
    }

    return res.status(200).json({
      message: "All Saved Food Retrieved",
      savedFoods
    })

  } catch (error) {
    console.error("Error in getAllSavedFood:", error)

    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    })
  }
}
export async function addComment(req, res){
   try {
        const {foodId, text} = req.body;

        if(!req.user){
          return res.status(401).json({message:"Unauthorized"})
        }
         
        if(!text || !text.trim()){
          return res.status(400).json({
            message:"Comment can not be empty!!"
          })
        }

        const comment = await commentModel.create({
          user : req.user._id,
          food: foodId,
          comment: text.trim(),
        })

        const count = await commentModel.countDocuments({food:foodId})
        await foodModel.findByIdAndUpdate(foodId,{
          $set:{commentCount: count}
        })

        const populatedComment = await commentModel.findById(comment._id).populate("user", "_id fullName email")

        return res.status(201).json({
          message: "User commented successfully",
          comment: populatedComment
        })
   } catch (error) {
     res.status(500).json({
      message:"Internal server Error from addComment " + error
     })
   }
}

export async function getAllComment(req, res){
   try {
       const {foodId} = req.params
       const comments = await commentModel.find({food:foodId}).populate("user").sort({createdAt: -1})
       return res.status(200).json({
        message: "get All comments ",
        comments
       })
   } catch (error) {
     return res.status(500).json({
      message:"Internal server Error from Add comment--" + error
     })
   }
}

export async function deleteComment(req, res) {
  try {
    const { id } = req.params

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const comment = await commentModel.findById(id)
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" })
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own comments" })
    }

    await comment.deleteOne()
    const count = await commentModel.countDocuments({ food: comment.food })
    await foodModel.findByIdAndUpdate(comment.food, {
      $set: { commentCount: count }
    })

    return res.status(200).json({ message: "Comment deleted successfully" })
  } catch (error) {
    return res.status(500).json({ message: `Internal server error from deleteComment: ${error.message}` })
  }
}

export async function getCurrentUser(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const user = await UserModel.findById(req.user._id).select("_id fullName email")
    return res.status(200).json({ message: "Current user fetched", user })
  } catch (error) {
    return res.status(500).json({ message: `Internal server error from getCurrentUser: ${error.message}` })
  }
}