import React, { useEffect } from 'react'
import { Button } from 'flowbite-react';
import { Quantity } from '../domain/Quantity';
import { Ingredient } from '../domain/Ingredient';
import { IngredientProps } from '../domain/IngredientProps';

const unitsOfMeasure = [
    { value: "teaspoon", label: "Teaspoon" },
    { value: "tablespoon", label: "Tablespoon" },
    { value: "cup", label: "Cup" },
    { value: "fluid ounce", label: "Fluid Ounce" },
    { value: "pint", label: "Pint" },
    { value: "quart", label: "Quart" },
    { value: "gallon", label: "Gallon" },
    { value: "ounce", label: "Ounce" },
    { value: "pound", label: "Pound" },
    { value: "milliliter", label: "Milliliter" },
    { value: "liter", label: "Liter" },
    { value: "gram", label: "Gram" },
    { value: "kilogram", label: "Kilogram" },
    { value: "pinch", label: "Pinch" },
    { value: "dash", label: "Dash" },
    { value: "slice", label: "Slice" },
    { value: "piece", label: "Piece" },
    { value: "can", label: "Can" },
    { value: "unit", label: "Unit" }
  ];
  
const Ingredients: React.FC<IngredientProps> = ({onIngredientsChange, ingredientsValue}) => {

    const [ingredients, setIngredients] = React.useState<Ingredient[]>(ingredientsValue);

    useEffect(() => { 
        onIngredientsChange(ingredients);
    }, [ingredients])

    const handleAddIngredient = () => {
        setIngredients([
          ...ingredients,
          { ingredient: "", quantity: { unit: "teaspoon", amount: 0 } },
        ]);
      };
    
      const handleIngredientChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
      ) => {
        const newIngredients = [...ingredients];
        newIngredients[index].ingredient = e.target.value;
        setIngredients(newIngredients);
      };
    
      const handleUnitOfMeasureChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
        index: number
      ) => {
        const newIngredients = [...ingredients];
        newIngredients[index].quantity.unit = e.target.value;
        setIngredients(newIngredients);
      };
    
      const handleAmountChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
      ) => {
        const newIngredients = [...ingredients];
        newIngredients[index].quantity.amount = parseInt(e.target.value);
        setIngredients(newIngredients);
      };
    
      const handleRemoveIngredient = (index: number) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
      };
  return (
    <div className="flex flex-col max-w-full mb-6">
        <p className="mb-2">Ingredients</p>
        {ingredients.map((ingredient, index) => (
          <div className="flex items-center mb-2" key={index}>
            <div className="w-1/3">
              <input
                type="text"
                value={ingredient.ingredient}
                placeholder="Ingredient name"
                onChange={(event) => handleIngredientChange(event, index)}
                className="text-black w-full"
                required
              />
            </div>
            <div className="w-20 ml-10 mr-2">
              <input
                type="number"
                value={ingredient.quantity.amount}
                onChange={(event) => handleAmountChange(event, index)}
                className="text-black w-full"
                required
              />
            </div>
            <div className="w-1/3">
              <select
                value={ingredient.quantity.unit}
                onChange={(event) => handleUnitOfMeasureChange(event, index)}
                className="text-black w-full"
              >
                {unitsOfMeasure.map((unit, index2) => (
                  <option
                    value={unit.value}
                    key={index2}
                    className="text-black"
                  >
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
            <Button
              color="failure"
              onClick={() => handleRemoveIngredient(index)}
              className="ml-2"
            >
              Remove
            </Button>
          </div>
        ))}

        <Button onClick={handleAddIngredient} color="gray" className='w-1/3'>
          Add ingredient
        </Button>
      </div>
  )
}

export default Ingredients