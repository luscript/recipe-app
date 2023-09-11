import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    ingredients: {type: Array, required: true},
    procedure: {type: String, required: true},
    cookingTime: {type: Object, required: true},
    servings: {type: Number, required: true},
    image: { public_id: String, secure_url: String },
    userOwner: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

export const RecipeModel = mongoose.model("Recipe", RecipeSchema);