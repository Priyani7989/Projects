import React, { useState, useEffect } from 'react';
import type { Recipe } from '../types';
import Spinner from './Spinner';

interface RecipeCardProps {
  recipe: Recipe;
  onSelectRecipe: (recipe: Recipe) => void;
  availableIngredients: string[];
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSelectRecipe, availableIngredients }) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [imageLoading, setImageLoading] = useState(true);

    const unsplashUrl = `https://source.unsplash.com/400x300/?${encodeURIComponent(recipe.imagePrompt)},Indian food`;
    
    // SVG placeholder for when images fail to load
    const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='%239ca3af'%3EImage Not Found%3C/text%3E%3C/svg%3E";


    useEffect(() => {
        // Reset state for new recipe prop
        setImageSrc(unsplashUrl);
        setImageLoading(true);
    }, [unsplashUrl]);


    const availableSet = new Set(availableIngredients);
    const missingCount = recipe.requiredIngredients.filter(ing => !availableSet.has(ing.toLowerCase())).length;

    const getMatchColor = () => {
        if (missingCount === 0) return 'border-green-500';
        if (missingCount <= 2) return 'border-yellow-500';
        return 'border-red-500';
    }

    const handleImageError = () => {
        setImageSrc(placeholderImage);
        setImageLoading(false);
    }

  return (
    <div className={`bg-white rounded-xl overflow-hidden border ${getMatchColor()} shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col`}>
      <div className="relative w-full h-48 bg-gray-200">
        {imageLoading && (
            <div className="absolute inset-0 flex justify-center items-center">
                <Spinner size="8" color="border-orange-500" />
            </div>
        )}
        <img
            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
            src={imageSrc || ''}
            alt={recipe.recipeName}
            onLoad={() => setImageLoading(false)}
            onError={handleImageError}
            style={{ display: imageSrc ? 'block' : 'none' }}
        />
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <p className="text-xs font-semibold uppercase tracking-wider text-orange-500 mb-2">{recipe.cuisine}</p>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{recipe.recipeName}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{recipe.description}</p>
        <div className="mb-4">
            {missingCount === 0 ? (
                <p className="text-green-600 text-sm font-semibold">You have all ingredients!</p>
            ) : (
                <p className="text-orange-600 text-sm font-semibold">
                    Missing {missingCount} ingredient{missingCount > 1 ? 's' : ''}
                </p>
            )}
        </div>
        <button
          onClick={() => onSelectRecipe(recipe)}
          className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 transition-colors duration-200 mt-auto"
        >
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
