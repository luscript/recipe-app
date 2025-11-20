import React from "react";
import "../styles/recipe.css";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import borrar from "../assets/delete.png";
import edit from "../assets/edit.png";
import placeholder from "../assets/tenedor.png";
import { RecipeParams } from "../domain/RecipeParams";

const Recipe = ({ recipe, handleEdit, handleDelete }: RecipeParams) => {
  

  // Some recipes stored their fields inside `dataJson` (stringified JSON).
  // Parse it and use its values as fallbacks when top-level fields are missing.
  const dataJson = (recipe as any).dataJson ? JSON.parse((recipe as any).dataJson) : null;
  const displayName = recipe.name || dataJson?.name || recipe.title || "";
  const ingredients = recipe.ingredients || dataJson?.ingredients || [];
  const procedure = recipe.procedure || dataJson?.procedure || "";
  const cookingTime = recipe.cookingTime || dataJson?.cookingTime || { hours: 0, minutes: 0 };
  const servings = recipe.servings || dataJson?.servings || "";

  return (
    <div className={`flex flex-col items-center mt-10"`}>
      <h1 className={`mb-1 foodName`}>{displayName}</h1>
      <div className="flex flex-col w-full">
        <div className="image-wrapper w-full">
          <img
            src={
              (recipe as any).image?.secure_url ||
              ((recipe as any).imagePath ? `http://localhost:3001/uploads/${(recipe as any).imagePath}` : placeholder)
            }
            alt="foodimage"
            className="detailedFoodImage self-center"
          />
          <div className="recipe-actions below">
            <button className="action-btn edit-btn" title="Edit" onClick={handleEdit}>
              <img src={edit} alt="edit" />
            </button>
            <button className="action-btn delete-btn" title="Delete" onClick={handleDelete}>
              <img src={borrar} alt="delete" />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 w-5/6 mt-8 mb-10">
        <div className="col-span-12 sm:col-span-7 rounded-2xl h-60 detailsBox">
          <h2 className="text-2xl mt-4 boxTitle">Ingredients:</h2>
          {ingredients.map((ingredient: any, index: number) => (
            <p key={index}>
              -{ingredient.quantity?.amount ?? 0} {ingredient.quantity?.unit ?? ''} {ingredient.ingredient}
            </p>
          ))}
        </div>
        <div className="col-span-12 sm:col-span-5 rounded-2xl h-60 detailsBox">
          <h2 className="text-2xl mt-4 boxTitle">Cooking time:</h2>
          <p>
            {cookingTime.hours} hours {cookingTime.minutes} {" "}
            minutes
          </p>
        </div>
        <div className="col-span-12 sm:col-span-5 rounded-2xl h-60 detailsBox">
          <h2 className="text-2xl mt-4 boxTitle">Servings:</h2>
          <p>{servings}</p>
        </div>
        <div className="col-span-12 sm:col-span-7 rounded-xl h-60 detailsBox">
          <h2 className="text-2xl mt-4 boxTitle">Procedure:</h2>
          <p>{procedure}</p>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
