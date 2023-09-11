import { Ingredient } from "./Ingredient";
import  { cookingTime } from './CookingTime'

export interface RecipeTypeII {
    name: string;
    ingredients: Ingredient[];
    procedure: string;
    cookingTime: cookingTime;
    servings: number;
    image: File | null;
    userOwner: string;
}