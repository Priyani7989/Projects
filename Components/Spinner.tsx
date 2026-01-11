
import React from 'react';

const Spinner = ({ size = '8', color = 'border-yellow-400' }: { size?: string; color?: string }) => {
  return (
    <div className={`animate-spin rounded-full h-${size} w-${size} border-b-2 ${color}`}></div>
  );
};

export default Spinner;
