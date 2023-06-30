import React from 'react'

interface RecipeProps {
    name: string;
    ingredients: string[];
    procedure: string;
    cookingTime: string;
    servings: number;
    image: string;
  }

const Recipe: React.FC<RecipeProps> = ({ name, ingredients, procedure, cookingTime, servings, image }) => {
  return (
    <div>
        <h1 className='text-2xl'>{name}</h1>
        <img src={image} alt="foodimage" />
        <h2>Ingredients:</h2>
        { ingredients.map((ingredient, index) => ( <p key={index}>{ingredient}</p> ))}
        <h2>Procedure:</h2>
        <p>{procedure}</p>
        <h2>Cooking time:</h2>
        <p>{cookingTime}</p>
        <h2>Servings:</h2>
        <p>{servings}</p>

    </div>
  )
}

export default Recipe