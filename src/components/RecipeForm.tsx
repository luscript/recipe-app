import React from "react";
import Ingredients from "./Ingredients";
import { Label, TextInput, Button, Textarea } from "flowbite-react";
import "../styles/recipeForm.css";
import RecipeFormInput from "./RecipeFormInput";
import CookingTime from "./CookingTime";
import { postRecipes, updateRecipe } from "../services/recipeService";
import { Ingredient } from "../domain/Ingredient";
import Swal from "sweetalert2";
import { RecipeFormType } from "../domain/RecipeFormType";
import { useNavigate } from "react-router-dom";

export default function RecipeForm({ recipeA }: { recipeA?: RecipeFormType }) {
  const [recipe, setRecipe] = React.useState({
    name: "",
    ingredients: [
      { ingredient: "", quantity: { unit: "teaspoon", amount: 0 } },
    ],
    procedure: "",
    cookingTime: { hours: 0, minutes: 0 },
    servings: 0,
    image: "",
    userOwner: ""
  });

  const [image, setImage] = React.useState<File | null>(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (recipeA) {
      setRecipe({
        ...recipeA
      });
    } else {
      setRecipe({
        ...recipe
      });
    }
  }, []);


  const onCookingTimeChange = (cookingTime: any) => {
    setRecipe({ ...recipe, cookingTime: cookingTime });
  };

  const onIngredientsChange = (newIngredients: Ingredient[]) => {
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const onInputChange = (label: string, inputValue: string) => {
    setRecipe({ ...recipe, [label]: inputValue });
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files && event.target.files[0];
    setImage(imageFile);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => { 
    event.preventDefault();
    if(image === null) { 
      Swal.fire({
        icon: "error",
        title: "Please upload an image",
      })
      return;
    }
    if(recipeA) {
      updateRecipe(recipe, image!).finally(() => navigate("/recipes"));
    } else {
      postRecipes(recipe, image!).finally(() => {
        const clearedRecipe = {
          name: "",
          ingredients: [
            { ingredient: "", quantity: { unit: "teaspoon", amount: 0 } },
          ],
          procedure: "",
          cookingTime: { hours: 0, minutes: 0 },
          servings: 0,
          image: "",
          userOwner: ""
        }
        setRecipe({...clearedRecipe});
      });
    }
      
    
  }

  return (
    <form className="flex flex-col mt-5 p-7 mb-5 recipeForm" onSubmit={(event) => handleSubmit(event)}>
      <RecipeFormInput
        inputType="text"
        name="Name"
        placeholder="Name of the recipe"
        label
        onInputChange={onInputChange}
        value={recipeA?.name}
      />
      <Ingredients
        onIngredientsChange={onIngredientsChange}
        ingredientsValue={recipeA?.ingredients || recipe.ingredients} 
      />
      <RecipeFormInput
        inputType="textarea"
        name="Procedure"
        placeholder="How is your recipe made?"
        label
        onInputChange={onInputChange}
        value={recipeA?.procedure}
      />
      <CookingTime onCookingTimeChange={onCookingTimeChange} value={recipeA?.cookingTime}/>
      <div className="mt-2 mb-6">
        <p className="mb-2">Image</p>
        <input type="file" accept="image/*" id="imageUploader" onChange={(event) => onImageChange(event)}/>
      </div>
      <RecipeFormInput 
        inputType="number"
        name="Servings"
        placeholder="Servings"
        label
        onInputChange={onInputChange}
        value={recipeA?.servings.toString()}
      />
      <div className="flex justify-center">
        <Button className="max-w-xs" type="submit">Submit</Button>
      </div>
    </form>
  );
}
