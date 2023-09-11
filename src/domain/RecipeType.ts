import { Ingredient } from "./Ingredient";
import  { cookingTime } from './CookingTime'
import { Image } from "./Image";

export interface RecipeType {
    _id: string;
    name: string;
    ingredients: Ingredient[];
    procedure: string;
    cookingTime: cookingTime;
    servings: number;
    image: Image;
}