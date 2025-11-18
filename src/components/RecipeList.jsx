import useRecipeStore from '../recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const favorites = useRecipeStore((state) => state.favorites);

  // Display filtered recipes if search term exists, otherwise show all
  const displayRecipes = searchTerm ? filteredRecipes : recipes;

  if (displayRecipes.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
        {searchTerm 
          ? 'No recipes found matching your search.' 
          : 'No recipes yet. Add your first recipe!'}
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '1.5rem',
      padding: '1rem'
    }}>
      {displayRecipes.map((recipe) => (
        <div
          key={recipe.id}
          style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'box-shadow 0.3s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
          }}
        >
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'start',
            marginBottom: '0.5rem'
          }}>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 'bold',
              margin: 0,
              color: '#333'
            }}>
              {recipe.title}
            </h3>
            {favorites.includes(recipe.id) && (
              <span style={{ fontSize: '1.5rem' }}>❤️</span>
            )}
          </div>
          <p style={{ 
            color: '#666',
            lineHeight: '1.5',
            margin: 0
          }}>
            {recipe.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;