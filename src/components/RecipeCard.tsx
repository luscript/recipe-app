import { useNavigate } from 'react-router-dom';
import { RecipeType } from '../domain/RecipeType'
import placeholder from '../assets/tenedor.png'

const RecipeCard = ({ recipe }: { recipe: RecipeType }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/recipe/${recipe._id}`);
    };

  return (
    <div className='flex flex-col items-center'>
        <h1 className={`mb-1 text-2xl`}>
        {recipe.name}
      </h1>

      <img
          src={
            // safe access in case backend/front shapes differ
            (recipe as any).image?.secure_url ||
            // fallback to imagePath served by backend (if available)
            ((recipe as any).imagePath ? `http://localhost:3001/uploads/${(recipe as any).imagePath}` : placeholder)
          }
          alt="foodimage"
          className="foodImage"
          onClick={handleClick}
        />
    </div>
  )
}

export default RecipeCard