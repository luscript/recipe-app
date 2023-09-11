import React from "react";
import { useParams } from "react-router-dom";
import { RecipeFormType } from "../domain/RecipeFormType";
import { getRecipe } from "../services/recipeService";
import RecipeForm from "../components/RecipeForm";
import Swal from "sweetalert2";

const editRecipe = () => {
  const [recipe, setRecipe] = React.useState<RecipeFormType | null>(null);
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    getRecipe(id!)
      .then((response) => {
        if (response.status !== 200) {
          setRecipe(null);
          return;
        }
        const newRecipe = response.data;
        newRecipe.image = "";
        setRecipe(newRecipe);
      })
      .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Error getting recipe"
          });
        }
      )
  }, []);

  return (
    <div className="flex flex-col items-center mt-5">
      <h1 className="text-2xl">Edit recipe</h1>
        {recipe && (<RecipeForm recipeA={recipe}/>)}
    </div>
  )
};

export default editRecipe;
