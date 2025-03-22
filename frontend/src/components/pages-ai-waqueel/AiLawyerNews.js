import React, { useEffect, useState } from "react";
import { IoNewspaperOutline } from "react-icons/io5";

const AiLawyerNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state
  const API_KEY = process.env.REACT_APP_GNEWS_API_KEY; // Your GNews API key
  // const API_KEY = process.env.REACT_APP_NEWS_API_KEY; // Your News API key

  useEffect(() => {
    const fetchNews = async () => {
      try {
        if (!API_KEY) {
          throw new Error("API key is missing");
        }
        const response = await fetch(
          `https://gnews.io/api/v4/search?q=India+AND+(property+OR+murder+OR+trafficking+OR+kidnapping+OR+robbery+OR+"court+cases"+OR+decisions)&token=${API_KEY}`
          // `https://newsapi.org/v2/everything?q=India+AND+(property+OR+murder+OR+trafficking+OR+kidnapping+OR+robbery+OR+"court+cases"+OR+decisions)&apiKey=${API_KEY}&language=en&sortBy=publishedAt`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data); // Log the response data to check the structure
        if (data.articles) {
          setNews(data.articles.slice(0, 60)); // Load 60 filtered news items
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [API_KEY]);

  // Function to distribute news items across rows
  const distributeNews = (newsArray, rows) => {
    const result = Array.from({ length: rows }, () => []);
    newsArray.forEach((item, index) => {
      result[index % rows].push(item);
    });
    return result;
  };

  const newsRows = distributeNews(news, 2);

  return (
    <div className="flex flex-col items-center mt-16 gap-6 px-4 sm:px-8 lg:px-16">
      <div className="flex text-blue-700 text-center gap-2 sm:gap-3 text-lg items-center border-2 border-slate-300 w-fit p-2 sm:p-3 rounded-full">
        <IoNewspaperOutline className="text-2xl" />
        <span className="text-base sm:text-lg">News</span>
      </div>
      <div className="flex items-center flex-col">
        <h1 className="text-4xl sm:text-5xl font-medium text-white">
          What our users think
        </h1>
        <p className="text-base sm:text-lg w-full max-w-2xl text-center text-teal-600 mt-4">
          Find out how our platform has changed the legal services experience
          for diverse users.
        </p>
      </div>

      {/* News Section */}
      <div className="mt-8 w-full max-w-6xl">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4 text-white">
          Indian Commercial News & Court Cases
        </h2>

        {/* Show loading or error message */}
        {loading && <p className="text-center text-lg">Loading...</p>}
        {error && (
          <p className="text-center text-lg text-red-500">Error: {error}</p>
        )}

        {/* Rows with Continuous Horizontal Scroll */}
        <div className="flex flex-col gap-4">
          {newsRows.map((row, rowIndex) => (
            <div key={rowIndex} className="w-full overflow-hidden">
              <div className="news-row overflow-hidden relative">
                <div className="news-items flex animate-scroll-horizontal">
                  {row.map((article, index) => (
                    <div
                      key={`${rowIndex}-${index}`}
                      className="p-3 sm:p-4 mb-4 sm:mb-6 mr-4 border border-gray-700 rounded-lg shadow-lg bg-transparent shadow-gray-600 flex-shrink-0"
                      style={{ width: "260px", height: "250px" }} // Decreased card height
                    >
                      <img
                        src={article.image || "https://via.placeholder.com/150"}
                        // src={
                        //   article.urlToImage ||
                        //   "https://via.placeholder.com/150"
                        // }
                        alt={article.title}
                        className="h-32 w-full object-fill rounded-md mb-2"
                      />
                      <h3 className="text-xs sm:text-sm font-semibold mb-1 truncate text-white">
                        {article.title}
                      </h3>
                      <p className="text-xs sm:text-xs text-gray-500 mb-2 truncate">
                        {article.description?.substring(0, 100)}
                      </p>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline text-xs"
                      >
                        Read more
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional styles */}
      <style jsx>{`
        .news-items {
          gap: 1rem; /* Adjusted gap between cards */
        }

        /* Horizontal scroll animation */
        @keyframes scroll-horizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-scroll-horizontal {
          animation: scroll-horizontal 20s linear infinite; /* Adjusted animation time */
          /* Adjust duration based on the number of items and their width */
        }

        .news-row {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .news-row:hover .animate-scroll-horizontal {
          animation-play-state: paused; /* Pause animation on hover */
        }
      `}</style>
    </div>
  );
};

export default AiLawyerNews;
