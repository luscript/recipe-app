import { useEffect, useState } from "react";
import { RecipeType } from "../domain/RecipeType";
import { getToken } from "../utils/getToken";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL ?? "http://localhost:3000";

const useRecetas = (recipeID?: string) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [recetas, setRecetas] = useState<RecipeType | null>(null);

    useEffect(() => {
        const getRecipe = async () => {
            if (!recipeID) return;
            try {
                setLoading(true);
                const headers = getToken();
                const response = await axios.get(
                    `${BASE_URL}/recipe?recipeID=${recipeID}`, {
                        headers: headers,
                    }
                );
                setRecetas(response.data);
            } catch (err: any) {
                setError(err?.message ?? "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        getRecipe();
    }, [recipeID]);

    return { loading, error, recetas };
}

export default useRecetas;