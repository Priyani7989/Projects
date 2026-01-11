import React from 'react';

interface CuisineFilterProps {
  cuisines: string[];
  selectedCuisine: string;
  onSelectCuisine: (cuisine: string) => void;
}

const CuisineFilter: React.FC<CuisineFilterProps> = ({ cuisines, selectedCuisine, onSelectCuisine }) => {
  return (
    <div className="flex justify-center items-center gap-2 mb-8 flex-wrap" role="toolbar" aria-label="Cuisine filter">
        <span id="filter-label" className="text-gray-600 font-medium mr-2">Filter by Cuisine:</span>
        {cuisines.map(cuisine => (
            <button
                key={cuisine}
                onClick={() => onSelectCuisine(cuisine)}
                aria-pressed={selectedCuisine === cuisine}
                className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-200 ${
                    selectedCuisine === cuisine
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
                {cuisine}
            </button>
        ))}
    </div>
  );
};

export default CuisineFilter;
