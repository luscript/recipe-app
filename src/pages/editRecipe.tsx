import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  const goBack = () => {
    navigate("/recipes");
  };

  return (
    <div className="flex flex-col items-center mt-5 w-full">
      <div className="title-row relative w-full flex items-center justify-center">
        <button onClick={goBack} className="back-btn absolute left-4" aria-label="Back to recipes">← Back</button>
        <h1 className="text-2xl mx-auto">Edit recipe</h1>
      </div>

        {recipe && (<RecipeForm recipeA={recipe}/>)}
    </div>
  )
};

export default editRecipe;
