import React from "react";
import "../styles/recipe.css";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import borrar from "../assets/delete.png";
import edit from "../assets/edit.png";
import { RecipeParams } from "../domain/RecipeParams";

const Recipe = ({ recipe, handleEdit, handleDelete }: RecipeParams) => {
  

  return (
    <div className={`flex flex-col items-center mt-10"`}>
      <h1 className={`mb-1 foodName`}>{recipe.name}</h1>
      <div className="flex flex-col w-full">
        <img
          src={recipe.image.secure_url}
          alt="foodimage"
          className="detailedFoodImage self-center"
        />
        <div className="flex self-center mt-4 gap-4">
          <img src={edit} alt="" width={30} onClick={handleEdit}/>
          <img src={borrar} alt="" width={30} onClick={handleDelete} />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 w-5/6 mt-8 mb-10">
        <div className="col-span-12 sm:col-span-7 rounded-2xl h-60 detailsBox">
          <h2 className="text-2xl mt-4 boxTitle">Ingredients:</h2>
          {recipe.ingredients.map((ingredient, index) => (
            <p key={index}>
              {" "}
              -{ingredient.quantity.amount} {ingredient.quantity.unit}{" "}
              {ingredient.ingredient}
            </p>
          ))}
        </div>
        <div className="col-span-12 sm:col-span-5 rounded-2xl h-60 detailsBox">
          <h2 className="text-2xl mt-4 boxTitle">Cooking time:</h2>
          <p>
            {recipe.cookingTime.hours} hours {recipe.cookingTime.minutes}{" "}
            minutes
          </p>
        </div>
        <div className="col-span-12 sm:col-span-5 rounded-2xl h-60 detailsBox">
          <h2 className="text-2xl mt-4 boxTitle">Servings:</h2>
          <p>{recipe.servings}</p>
        </div>
        <div className="col-span-12 sm:col-span-7 rounded-xl h-60 detailsBox">
          <h2 className="text-2xl mt-4 boxTitle">Procedure:</h2>
          <p>{recipe.procedure}</p>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
