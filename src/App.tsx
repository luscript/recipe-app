import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/home";
import MyRecipes from "./pages/myRecipes";
import AddRecipes from "./pages/addRecipes";
import Navbar from "./components/Navbar";
import Login from "./pages/login";
import Register from "./pages/register";
import RecipeDetails from "./pages/recipeDetails";
import EditRecipe from "./pages/editRecipe";
import NotFound from "./pages/notFound.tsx";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/register']; 
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="h-screen flex flex-col">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<MyRecipes />} />
        <Route path="/add-recipes" element={<AddRecipes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipe/:id" element={<RecipeDetails/>}/>
        <Route path="/recipe/edit/:id" element={<EditRecipe/>}/>
        <Route path="*" element={<NotFound /> } />
      </Routes>
    </div>
  );
}

export default App;
