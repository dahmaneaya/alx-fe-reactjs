import { useNavigate } from 'react-router-dom';
import useRecipeStore from '../recipeStore';

const FavoritesList = () => {
  const navigate = useNavigate();
  const recipes = useRecipeStore((state) => state.recipes);
  const favorites = useRecipeStore((state) => state.favorites);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  // Get the actual recipe objects for favorites
  const favoriteRecipes = favorites
    .map((id) => recipes.find((recipe) => recipe.id === id))
    .filter(Boolean); // Remove any undefined values

  if (favoriteRecipes.length === 0) {
    return (
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          color: '#333'
        }}>
          My Favorites ❤️
        </h2>
        <p style={{ color: '#666' }}>
          No favorite recipes yet. Start adding some!
        </p>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      marginBottom: '2rem'
    }}>
      <h2 style={{ 
        fontSize: '1.5rem', 
        fontWeight: 'bold', 
        marginBottom: '1.5rem',
        color: '#333'
      }}>
        My Favorites ❤️
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1rem'
      }}>
        {favoriteRecipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              backgroundColor: '#fef2f2',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #fecaca',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#fee2e2';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#fef2f2';
            }}
          >
            <div 
              onClick={() => navigate(`/recipe/${recipe.id}`)}
              style={{ marginBottom: '0.5rem' }}
            >
              <h3 style={{ 
                fontSize: '1.1rem', 
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                color: '#333'
              }}>
                {recipe.title}
              </h3>
              <p style={{ 
                color: '#666',
                fontSize: '0.9rem',
                lineHeight: '1.4',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}>
                {recipe.description}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFavorite(recipe.id);
              }}
              style={{
                marginTop: '0.5rem',
                padding: '0.5rem',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Remove ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;