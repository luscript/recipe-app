import { Ingredient } from "./Ingredient";

export interface IngredientProps {
    onIngredientsChange: (newIngredient: Ingredient[]) => void;
    ingredientsValue: Ingredient[];
  }