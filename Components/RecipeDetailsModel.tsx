import React, { useEffect, useState } from 'react';
import { analyzeRecipeIngredients } from '../services/recipeService';
import type { Recipe, RecipeAnalysis } from '../types';
import { XIcon } from '../constants';
import Spinner from './Spinner';

interface RecipeDetailsModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  availableIngredients: string[];
}

const RecipeDetailsModal: React.FC<RecipeDetailsModalProps> = ({ recipe, onClose, availableIngredients }) => {
  const [analysis, setAnalysis] = useState<RecipeAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (recipe) {
      const fetchAnalysis = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const result = await analyzeRecipeIngredients(availableIngredients, recipe);
          setAnalysis(result);
        } catch (err) {
          setError('Could not fetch recipe details. Please try again.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchAnalysis();
    }
  }, [recipe, availableIngredients]);

  if (!recipe) return null;
  
  const availableSet = new Set(availableIngredients);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl border border-gray-200 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 sticky top-0 bg-white/80 backdrop-blur-lg z-10 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-900">{recipe.recipeName}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-800">
              <XIcon className="h-8 w-8" />
            </button>
          </div>
          <p className="text-gray-600 mt-1">{recipe.description}</p>
        </div>
        
        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
                <Spinner size="12" color="border-orange-500" />
            </div>
          ) : error ? (
            <div className="text-center text-red-600 p-8">{error}</div>
          ) : analysis ? (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-l-4 border-orange-500 pl-3">Ingredients</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {recipe.requiredIngredients.map(ing => (
                    <li key={ing} className={availableSet.has(ing.toLowerCase()) ? 'text-green-600' : 'text-red-600'}>
                        {ing} {availableSet.has(ing.toLowerCase()) ? <span className="text-gray-500 text-sm">(You have this)</span> : ''}
                    </li>
                  ))}
                </ul>
              </div>

              {analysis.missingIngredients.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 border-l-4 border-orange-500 pl-3">Ingredient Substitutions</h3>
                  <div className="space-y-3">
                    {analysis.missingIngredients.map(item => (
                      <div key={item.ingredient} className="bg-gray-100 p-3 rounded-lg">
                        <p className="font-semibold text-red-600">{item.ingredient}: 
                          <span className="font-normal text-gray-700 ml-2">{item.substitutions.join(' or ')}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-l-4 border-orange-500 pl-3">Instructions</h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  {analysis.instructions.map((step, index) => (
                    <li key={index} className="pl-2">{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsModal;
