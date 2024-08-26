import React from 'react';

const WeatherWidget = () => {
  return (
    <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md w-full">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl">Kharar</h3>
          <p>92°F - Very hot outside</p>
        </div>
        <div>
          <img src="https://via.placeholder.com/50" alt="Weather Icon" />
        </div>
      </div>
      <p className="mt-2">See full forecast</p>
    </div>
  );
};

export default WeatherWidget;
