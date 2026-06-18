
import foodPartnerModel from "../model/foodPartner.model.js";
import foodModel from "../model/foodItem.model.js";
 

export async function getFootPartnerById(req, res) {
  try {
    const { id } = req.params;

    const foodPartner = await foodPartnerModel.findById(id).lean(); // lean convert mongoose document into normal json
    if (!foodPartner) {
      return res.status(404).json({
        message: "Food partner not found",
      });
    }

    const foodItems = await foodModel.find({
      foodPartner: id,
    }).lean();
    
    res.status(200).json({
      message: "Food partner retrieved successfully",
      foodPartner: {
        ...foodPartner,
        foodItems,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}