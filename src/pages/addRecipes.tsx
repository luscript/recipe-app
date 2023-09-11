import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';
import { getUser } from "../services/userService.tsx";


const AddRecipes = () => {
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        getUser(localStorage.getItem('token') as string).then((response) => {
            const res = (response as AxiosResponse);
            if (!res.data) {
                navigate('/login', {state: {previousUrl: location.pathname}});
            }
        });
    }, []);

  return (
    <div className='flex justify-center p-5'>
      <RecipeForm />
    </div>
  )
}

export default AddRecipes