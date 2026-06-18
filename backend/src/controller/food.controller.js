
import foodModel from "../model/foodItem.model.js"
import { uploadfile } from "../services/storage.service.js";
import fs from "fs"
export async function createFood(req, res) {
  try {
        const {name , description} = req.body
        if(!name || !description){
          return res.status(400).json({
            message:"Name and Description required"
          })
        }
        if(!req.file){
          return res.status(400).json({
            message:"File is required"
          })
        }
        const result = await uploadfile(req.file.path);  //  return object from cloudnery 
        const foodItem = await foodModel.create({
          video:result.secure_url,
          name:name,
          description :description,
          foodPartner: req.foodPartner._id
        })
         fs.unlinkSync(req.file.path) // delete local file
        res.status(201).json({
            message: "Upload successful",
            food: foodItem,
           foodPartner:foodItem.foodPartner
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Upload failed" });
    }  
}
export async function getFoodItems(req, res) {
   try {
     const foodItems = await foodModel.find()
     return res.status(200).json({
      message:"food item fetch successfully",
      foodItems,

     })
   } catch (error) {
    return res.status(500).json({
      message:"Internal Server error"
    })
   }
}
