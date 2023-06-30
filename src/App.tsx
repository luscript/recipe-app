import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import MyRecipes from './pages/myRecipes'
import AddRecipes from './pages/addRecipes'
import Navbar from './components/Navbar'
function App() {
  

  return (
    <div className='h-screen flex flex-col'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/recipes" element={ <MyRecipes /> } />
          <Route path="/add-recipes" element={ <AddRecipes /> } />
        </Routes>
      </Router>
    </div>
  )
}

export default App
