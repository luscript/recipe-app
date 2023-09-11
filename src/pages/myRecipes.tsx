import React, {useEffect} from "react";
import {getRecipes} from "../services/recipeService";
import {RecipeType} from "../domain/RecipeType";
import {Link, useNavigate, useLocation} from "react-router-dom";
import '../styles/myRecipes.css'
import RecipeCard from "../components/RecipeCard";

const MyRecipes = () => {
    const [recipes, setRecipes] = React.useState<RecipeType[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        getRecipes()
            .then((response) => {
                const res = (response as AxiosResponse);
                if (res.response?.status === 401) {
                    navigate('/login', {state: {previousUrl: location.pathname}});
                } else {
                    setRecipes(res.data);
                }
            })
            .finally(() => setLoading(false));
    }, []);


    return (
        <div className="flex flex-col items-center">
            {!loading && (
                <>
                    {recipes.length === 0 ? (
                        <div>
                            <h1 className="text-4xl">You have no recipes yet</h1>
                            <Link to="/add-recipes" className="mt-6">
                                Add a recipe
                            </Link>
                        </div>
                    ) : (
                        <>
                            <h1 className="title">Your recipes</h1>
                            <div
                                className={`grid grid-cols-1 sm:grid-cols-${Math.min(2, recipes.length)} md:grid-cols-${Math.min(3, recipes.length)} gap-4 mt-14 w-4/5 mb-10`}
                            >
                                {recipes.map((recipe, index) => (
                                    <RecipeCard recipe={recipe} key={index}/>
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default MyRecipes;
