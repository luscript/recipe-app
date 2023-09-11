import { useNavigate } from 'react-router-dom';
import { RecipeType } from '../domain/RecipeType'

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
          src={recipe.image.secure_url}
          alt="foodimage"
          className="foodImage"
          onClick={handleClick}
        />
    </div>
  )
}

export default RecipeCard