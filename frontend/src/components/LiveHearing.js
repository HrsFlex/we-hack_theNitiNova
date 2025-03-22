import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import YouTube from "react-youtube";

const LiveHearing = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const API_KEY = "AIzaSyB1HugtMa5ivEp8zkd94IBpXfNuMV41WsI"; // Replace with your actual API key
  // const API_KEY = ""; // Replace with your actual API key
  const channelHandle = "@livelawindia"; // Channel handle to search for
  const MAX_RESULTS = 50;

  // Function to fetch channel ID from handle
  const getChannelIdFromHandle = async (apiKey, handle = "livelawindia") => {
    try {
      // Clean the handle to remove any '@' symbol if present
      const cleanHandle = handle.startsWith("@") ? handle.slice(1) : handle;

      // Fetch channel ID using the search endpoint
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${cleanHandle}&type=channel&key=${apiKey}`
      );

      console.log("API Response:", response.data); // Debug log to inspect response

      if (response.data.items.length === 0) {
        throw new Error("No channel found for the given handle.");
      }

      // Return the channel ID of the first result
      return response.data.items[0]?.snippet?.channelId || null;
    } catch (error) {
      console.error(
        "Error fetching channel ID:",
        error.response?.data || error.message
      );
      console.error("Full Error Details:", error);
      return null;
    }
  };

  // Function to fetch videos from the channel
  const fetchVideos = useCallback(async () => {
    try {
      const channelId = await getChannelIdFromHandle(API_KEY, channelHandle);
      if (!channelId) {
        console.error("Failed to resolve channel ID.");
        return;
      }

      // Fetch videos using the channel ID
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&key=${API_KEY}&maxResults=${MAX_RESULTS}`
      );
      console.log("Fetched Videos:", response.data.items); // Debug log for fetched videos
      setVideos(response.data.items);
    } catch (error) {
      console.error(
        "Error fetching videos:",
        error.response?.data || error.message
      );
    }
  }, [API_KEY, channelHandle, MAX_RESULTS]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  // Infinite scroll logic for each column
  const columns = [
    videos.slice(0, Math.ceil(videos.length / 3)), // First column
    [
      ...videos.slice(
        Math.ceil(videos.length / 3),
        Math.ceil((2 * videos.length) / 3)
      ),
      ...videos.slice(
        Math.ceil(videos.length / 3),
        Math.ceil((2 * videos.length) / 3)
      ),
    ], // Second column with looping logic
    videos.slice(Math.ceil((2 * videos.length) / 3)), // Third column
  ];

  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-6 text-center">
        Live Hearings
      </h1>

      {/* Three Vertical Columns */}
      <div className="flex justify-center space-x-4 gap-5">
        {columns.map((column, index) => (
          <div
            key={index}
            className={`overflow-hidden h-[600px] w-[250px] relative ${
              index === 1
                ? "flex flex-col justify-start animate-second-row"
                : ""
            }`}
          >
            <div
              className={`flex flex-col space-y-6 ${
                index === 1 ? "animate-scroll-y" : ""
              }`}
            >
              {column.map((video) => (
                <div
                  key={video.id.videoId}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
                  onClick={() => setSelectedVideo(video.id.videoId)}
                >
                  <img
                    src={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-sm font-semibold text-gray-700">
                      {video.snippet.title}
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      {video.snippet.channelTitle}
                    </p>
                    <span className="bg-red-500 text-white text-xs rounded px-2 py-1 mt-2 inline-block">
                      Live
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Video Playback */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg overflow-hidden w-11/12 md:w-3/4 lg:w-1/2">
            <div className="relative">
              <YouTube
                videoId={selectedVideo}
                opts={{
                  height: "390",
                  width: "100%",
                  playerVars: {
                    autoplay: 1,
                  },
                }}
              />
              <button
                className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full p-2"
                onClick={() => setSelectedVideo(null)}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Add custom CSS for vertical scrolling animation and column-specific effects
const styles = `
  @keyframes scroll-y {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-100%);
    }
  }
  .animate-scroll-y {
    animation: scroll-y 380s linear infinite;
  }
  .animate-second-row {
    animation: move-down 60s linear infinite;
  }
  @keyframes move-down {
    0%, 50% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(100%);
    }
  }

  @keyframes move-up {
    0%, 50% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-100%);
    }
  }
  .animate-first-third-row {
    animation: move-up 20s linear infinite;
  }
`;

// Inject custom styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default LiveHearing;
