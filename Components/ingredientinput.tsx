import React, { useState } from 'react';
import { XIcon } from '../constants';

interface IngredientInputProps {
  ingredients: string[];
  setIngredients: React.Dispatch<React.SetStateAction<string[]>>;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ ingredients, setIngredients }) => {
  const [currentIngredient, setCurrentIngredient] = useState('');

  const handleAddIngredient = () => {
    if (currentIngredient && !ingredients.includes(currentIngredient.trim().toLowerCase())) {
      setIngredients([...ingredients, currentIngredient.trim().toLowerCase()]);
      setCurrentIngredient('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    setIngredients(ingredients.filter(ingredient => ingredient !== ingredientToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-gray-200 shadow-lg">
      <label htmlFor="ingredient-input" className="block text-lg font-medium text-orange-600 mb-2">
        What ingredients do you have?
      </label>
      <div className="flex items-center gap-2">
        <input
          id="ingredient-input"
          type="text"
          value={currentIngredient}
          onChange={(e) => setCurrentIngredient(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., chicken, onion, tomato"
          className="flex-grow bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={handleAddIngredient}
          className="bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 transition-colors duration-200"
        >
          Add
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {ingredients.map((ingredient) => (
          <span
            key={ingredient}
            className="flex items-center bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full"
          >
            {ingredient}
            <button
              onClick={() => handleRemoveIngredient(ingredient)}
              className="ml-2 text-gray-500 hover:text-gray-800"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default IngredientInput;
