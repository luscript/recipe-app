import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getRecipe, deleteRecipe } from "../services/recipeService";
import { RecipeType } from "../domain/RecipeType";
import Recipe from "../components/Recipe";
import "../styles/recipeDetails.css";
import Swal from "sweetalert2";
import { AxiosResponse } from "axios";
import { fireAlert } from "../utils/fireAlert.ts";

const RecipeDetails = () => {

  const { id } = useParams<{ id: string }>();

  const [recipe, setRecipe] = React.useState<RecipeType | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const navigate = useNavigate();

  React.useEffect(() => {
    getRecipe(id!)
      .then((response) => {
        const res = ( response as AxiosResponse)
        if (res.status !== 200) {
          setRecipe(null);
          return;
        }
        setRecipe(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = () => { 
    navigate(`/recipe/edit/${id}`);
  };

  const handleDelete = () => { 
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete recipe!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRecipe(id!).then(() => navigate("/recipes"))
      }
    })
  };

  return (
    <div className="flex justify-center w-full recipeDetailsBg">
      {!loading && (
        <>
          {recipe ? (
            <div className="flex flex-col w-full">
              <Recipe recipe={recipe} handleEdit={handleEdit} handleDelete={handleDelete}/>
            </div>
          ) : (
            <h1 className="text-5xl text-red-600">Recipe not found</h1>
          )}
        </>
      )}
    </div>
  );
};

export default RecipeDetails;
