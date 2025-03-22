import React from "react";
import rightsData from "./fundamentalRights.json";

const FundamentalRights = () => {
  return (
    <div className="min-h-screen p-6  ">
      <h1 className="text-4xl font-bold text-center mb-10 text-white drop-shadow-md">
        Fundamental Rights of Indian Citizens
      </h1>
      <div className="space-y-8 max-w-5xl mx-auto">
        {rightsData.map((right, index) => (
          <div
            key={index}
            className="bg-white/10 shadow-lg rounded-lg p-6 hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <h2 className="text-2xl font-semibold text-gray-200 mb-4 flex items-center gap-2">
              <span className="text-blue-400">
                {/* Example icon (can replace with another library or SVG) */}
                🛡️
              </span>
              {right.category}
            </h2>
            <ul className="list-disc list-inside space-y-3">
              {right.articles.map((article, idx) => (
                <li
                  key={idx}
                  className="text-gray-300 leading-relaxed hover:text-gray-100 transition-colors duration-200"
                >
                  <span className="font-medium text-gray-100">
                    {article.article}:{" "}
                  </span>
                  {article.description}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FundamentalRights;
