import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useRecipeStore from '../recipeStore';

const RecommendationsList = () => {
  const navigate = useNavigate();
  const recommendations = useRecipeStore((state) => state.recommendations);
  const generateRecommendations = useRecipeStore((state) => state.generateRecommendations);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const favorites = useRecipeStore((state) => state.favorites);

  // Generate recommendations when component mounts
  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  if (recommendations.length === 0) {
    return null; // Don't show section if no recommendations
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
        Recommended for You 🌟
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1rem'
      }}>
        {recommendations.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              backgroundColor: '#eff6ff',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #bfdbfe',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#dbeafe';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#eff6ff';
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
                if (!favorites.includes(recipe.id)) {
                  addFavorite(recipe.id);
                }
              }}
              disabled={favorites.includes(recipe.id)}
              style={{
                marginTop: '0.5rem',
                padding: '0.5rem',
                backgroundColor: favorites.includes(recipe.id) ? '#9ca3af' : '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '0.9rem',
                cursor: favorites.includes(recipe.id) ? 'not-allowed' : 'pointer',
                width: '100%'
              }}
            >
              {favorites.includes(recipe.id) ? 'Already Favorite' : 'Add to Favorites ❤️'}
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={generateRecommendations}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#8b5cf6',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '0.9rem',
          cursor: 'pointer'
        }}
      >
        🔄 Refresh Recommendations
      </button>
    </div>
  );
};

export default RecommendationsList;