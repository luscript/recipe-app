import { Ingredient } from "./Ingredient";
import  { CookingTimeI } from './CookingTime'

export interface RecipeFormType {
    _id: string;
    name: string;
    ingredients: Ingredient[];
    procedure: string;
    cookingTime: CookingTimeI;
    servings: number;
    image: string;
    userOwner: string;
}