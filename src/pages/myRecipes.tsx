import React from 'react'
import recipes from '../recipes.js'
import Recipe from '../components/Recipe'

interface RecipeType {
    name: string;
    ingredients: string[];
    procedure: string;
    cookingTime: string;
    servings: number;
    image: string;
  }

const MyRecipes = () => {
  return (
    <div className='text-center mt-10'>
        <h1 className='text-4xl font-bold'>My recipes</h1>
        <div className='grid grid-cols-3 mt-20'>
            {recipes.map((recipe: RecipeType) => ( <Recipe {...recipe} /> ))}
        </div>
    </div>
  )
}

export default MyRecipes