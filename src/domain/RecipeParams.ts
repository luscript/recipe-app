import { RecipeType } from "./RecipeType";

export interface RecipeParams {
    recipe: RecipeType;
    handleEdit:  () => void;
    handleDelete: () => void;
}