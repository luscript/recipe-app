import { RecipeModel } from "../models/Recipe.js";
import { UserModel } from "../models/User.js";
import { decodeToken } from "../utils/decodeToken.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";
import fs from "fs/promises";



export const getRecipes = async (req, res) => {
  let decodedToken = decodeToken(req);

  if (!decodedToken || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  try {
    const recipes = await RecipeModel.find({ userOwner: decodedToken.id });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(400).json({ message: "Could not fetch recipes" });
  }
};

export const getRecipe = async (req, res) => {
  let decodedToken = decodeToken(req);
  if (!decodedToken || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }
  try {
    const recipe = await RecipeModel.findOne({
      _id: req.query.recipeID,
      userOwner: decodedToken.id,
    });
    if (recipe) {
      res.status(200).json(recipe);
      return;
    }
    res.status(404).json({ message: "recipe not found!" });
  } catch (error) {
    res.status(404).json({ message: "recipe not found" });
  }
};

export const createRecipe = async (req, res) => {

  let decodedToken = decodeToken(req);

  if (!decodedToken || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const result = await uploadImage(req.files.image.tempFilePath);  
  const recipe = new RecipeModel(JSON.parse(req.body.data));

  recipe.image = { public_id: result.public_id, secure_url: result.secure_url }; 
  await fs.unlink(req.files.image.tempFilePath);
  try {
    const user = await UserModel.findById(decodedToken.id);
    recipe.userOwner = user._id;
    const savedRecipe = await recipe.save();
    user.recipes.push(savedRecipe._id);
    await user.save();
    res.status(200).json({ message: "Recipe saved" });
  } catch (error) {
    res.status(400).json({ message: "Could not save recipe" });
  }
};

export const deleteRecipe = async (req, res) => {

  let decodedToken = decodeToken(req);
  if (!decodedToken || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  try {
    const recipe = await RecipeModel.findOne({
      _id: req.query.recipeID,
      userOwner: decodedToken.id,
    });

    if (recipe) {
      const imageId = recipe.image.public_id;
      await RecipeModel.deleteOne({ _id: req.query.recipeID });
      await deleteImage(imageId);
      res.status(200).json({ message: "recipe deleted" });
      return;
    }
    res.status(404).json({ message: "recipe not found!" });
  } catch {
    res.status(404).json({ message: "recipe not found" });
  }
};

export const updateRecipe = async (req, res) => {

  let decodedToken = decodeToken(req);
  if (!decodedToken || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }
  try {
    const recipe = await RecipeModel.findOne({
      _id: req.query.recipeID,
      userOwner: decodedToken.id,
    });
    if (recipe) {
      const result = await uploadImage(req.files.image.tempFilePath);
      const imageId = recipe.image.public_id;
      imageId ? await deleteImage(imageId) : null;
      let updatedRecipe = JSON.parse(req.body.data);
      const response = await RecipeModel.updateOne(
        { _id: req.query.recipeID },
        {
          $set: {
            name: updatedRecipe.name,
            ingredients: updatedRecipe.ingredients,
            procedure: updatedRecipe.procedure,
            cookingTime: updatedRecipe.cookingTime,
            servings: updatedRecipe.servings,
            image: {
              public_id: result.public_id,
              secure_url: result.secure_url,
            },
          },
        }
      );
      await fs.unlink(req.files.image.tempFilePath);
      return res.status(200).json({ message: "recipe updated" });
    }
    res.status(404).json({ message: "recipe not found!" });
  } catch {
    res.status(400).json({ message: "Could not update recipe" });
  }
};
