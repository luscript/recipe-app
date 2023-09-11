
import { getRecipe, getRecipes, createRecipe, deleteRecipe, updateRecipe } from '../controllers/RecipesController.js'
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/myRecipes', getRecipes);

router.get('/recipe', getRecipe);

router.post('/', createRecipe);

router.delete('/delete', deleteRecipe);

router.put('/update', updateRecipe);



export {router as recipesRouter};