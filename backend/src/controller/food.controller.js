import foodModel from "../model/foodItem.model.js"

export async function createFood(req, res) {
    console.log(req.foodPartner);
    console.log(req.body)
    console.log(req.file)
    res.send("item created")
    
}