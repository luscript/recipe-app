import axios, {AxiosResponse} from "axios";
import Swal from "sweetalert2";
import {getToken} from "../utils/getToken";


const BASE_URL = "http://localhost:3001/recipes";

export const postRecipes =  async (recipe: any, image: File | null): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append("image", image!); // Add the image file
    formData.append("data", JSON.stringify(recipe));
    const headers = getToken();
    const response = await axios.post(`${BASE_URL}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': headers.Authorization
      },
    })
    if (response.status === 200) {
      await Swal.fire({
        icon: "success",
        title: "Recipe added successfully",
      });
    } else {
      await Swal.fire({
        icon: "error",
        title: `Error adding recipe: ${response.data.message}`
      });
    }
  } catch (err) {
    await Swal.fire({
      icon: "error",
      title: "Error adding recipe",
    });
  }
};

export const getRecipes = async () => {
  try {
    const headers = getToken();
    return await axios.get(`${BASE_URL}/myRecipes`, {
      headers: headers,
    });
  } catch (err) {
    return err;
  }
};

export const getRecipe = async (recipeID: string) :Promise<AxiosResponse | any> => {
  try {
    const headers = getToken();
    return await axios.get(
        `${BASE_URL}/recipe/?recipeID=${recipeID}`, {
          headers: headers,
        }
    );
  } catch (err) {
    return err;
  }
};

export const deleteRecipe = async (recipeID: string) : Promise<void> => {
  try {
    const headers = getToken();
    const response =  await axios.delete(
        `${BASE_URL}/delete/?recipeID=${recipeID}`, {
          headers: headers,
        }
    );
    if (response.status === 200) {
      await Swal.fire(
          'Deleted!',
          'Your recipe has been deleted.',
          'success'
      )
    } else {
      await Swal.fire(
          'Error!',
          'Your recipe could not be deleted.',
          'error'
      )
    }
  } catch (err) {
    await Swal.fire(
        'Error!',
        'Your recipe could not be deleted.',
        'error'
    )
  }
}

export const updateRecipe = async (recipe: any, image: File | null) : Promise<void> => {
  try {
    const Authorization = getToken().Authorization;
    const formData = new FormData();
    formData.append("image", image!); // Add the image file
    formData.append("data", JSON.stringify(recipe));
    const response = await axios.put(`${BASE_URL}/update/?recipeID=${recipe._id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization
      },
    });
    if (response.status !== 200) {
      await Swal.fire({
        text: response.data.message,
        icon: "error",
        title: "Error updating recipe",
      });
      return;
    }
    await Swal.fire({
      icon: "success",
      title: "Recipe updated successfully",
    });
  } catch (err) {
    await Swal.fire({
      icon: "error",
      title: "Error updating recipe",
    });
  }
}
