import { useNavigate } from 'react-router-dom';
import useRecipeStore from '../recipeStore';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    // Confirm before deleting
    const confirmed = window.confirm(
      'Are you sure you want to delete this recipe? This action cannot be undone.'
    );

    if (confirmed) {
      deleteRecipe(recipeId);
      // Navigate back to home after deletion
      navigate('/');
    }
  };

  return (
    <button
      onClick={handleDelete}
      style={{
        padding: '0.75rem 1.5rem',
        backgroundColor: '#ef4444',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#dc2626';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = '#ef4444';
      }}
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;