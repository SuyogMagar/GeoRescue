import React from 'react';

const NewsFeed = ({ newsItems }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {newsItems.map((news, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg p-4">
          <img src={news.image} alt={news.title} className="rounded-lg w-full h-40 object-cover" />
          <h3 className="text-lg font-semibold mt-4">{news.title}</h3>
          <p className="text-gray-600 mt-2">{news.description}</p>
          <button className="mt-4 text-blue-500 underline">Read more</button>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
