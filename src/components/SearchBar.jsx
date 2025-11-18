import useRecipeStore from '../recipeStore';

const SearchBar = () => {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterRecipes();
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <input
        type="text"
        placeholder="Search recipes..."
        onChange={handleSearch}
        style={{
          width: '100%',
          padding: '0.75rem 1rem',
          border: '2px solid #e5e7eb',
          borderRadius: '8px',
          fontSize: '1rem',
          boxSizing: 'border-box',
          transition: 'border-color 0.3s',
          outline: 'none'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#3b82f6';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#e5e7eb';
        }}
      />
    </div>
  );
};

export default SearchBar;