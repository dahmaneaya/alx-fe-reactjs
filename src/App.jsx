import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import useRecipeStore from './recipeStore';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';

function App() {
  const setRecipes = useRecipeStore((state) => state.setRecipes);

  // Initialize with some sample recipes
  useEffect(() => {
    const sampleRecipes = [
      {
        id: 1,
        title: 'Spaghetti Carbonara',
        description: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and black pepper. Creamy and delicious!',
      },
      {
        id: 2,
        title: 'Chicken Tikka Masala',
        description: 'Tender chicken pieces in a creamy, spiced tomato sauce. A beloved Indian curry dish that is perfect with rice or naan.',
      },
      {
        id: 3,
        title: 'Caesar Salad',
        description: 'Crisp romaine lettuce with parmesan cheese, croutons, and a tangy Caesar dressing. A timeless classic.',
      },
      {
        id: 4,
        title: 'Beef Tacos',
        description: 'Seasoned ground beef in soft or hard taco shells with fresh toppings like lettuce, tomatoes, cheese, and salsa.',
      },
      {
        id: 5,
        title: 'Vegetable Stir Fry',
        description: 'A colorful mix of fresh vegetables stir-fried in a savory sauce. Healthy, quick, and delicious!',
      },
    ];
    setRecipes(sampleRecipes);
  }, [setRecipes]);

  // Home page component
  const HomePage = () => (
    <>
      <AddRecipeForm />
      <SearchBar />
      <FavoritesList />
      <RecommendationsList />
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          marginBottom: '1.5rem',
          color: '#333'
        }}>
          All Recipes
        </h2>
        <RecipeList />
      </div>
    </>
  );

  return (
    <Router>
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        padding: '2rem 1rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '2rem',
            color: '#1f2937'
          }}>
            🍳 Recipe Sharing App
          </h1>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;