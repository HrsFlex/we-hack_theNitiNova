import React, { useEffect, useState } from "react";

const Constitution = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null); // For storing the selected item's details

  useEffect(() => {
    // Fetch the JSON data
    fetch("/ipc.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching Article data:", error));
  }, []);

  // Filter data based on search query
  const filteredData = data.filter((item) =>
    [
      item.chapter,
      item.chapter_title,
      item.Section,
      item.section_title,
      item.section_desc,
    ]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-6 text-center">
        Constitution Articles & Sections
      </h1>
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by Article, Title, or Description"
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredData.map((item, index) => (
          <div
            key={index}
            className="bg-transparent rounded-md shadow-gray-700 shadow-lg p-4 hover:bg-zinc-600 transition"
          >
            <h2 className="text-lg font-semibold text-white">
              Chapter : <span>{item.chapter}</span>
            </h2>
            <p className="text-sm text-gray-300 mt-1">
              <span className="font-bold">Title: </span>
              {item.chapter_title}
            </p>
            <p className="text-sm text-gray-300 mt-1">
              <span className="font-bold">Section: </span>
              {item.Section}
            </p>
            <p className="text-sm text-gray-300 mt-1">
              <span className="font-bold">Section Title: </span>
              {item.section_title}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              {item.section_desc && item.section_desc.length > 100
                ? `${item.section_desc.slice(0, 100)}...`
                : item.section_desc || "No description available"}
            </p>
            {item.section_desc && item.section_desc.length > 100 && (
              <button
                className="text-indigo-400 mt-2 underline"
                onClick={() => setSelectedItem(item)}
              >
                Read More
              </button>
            )}
          </div>
        ))}
      </div>
      {filteredData.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No results found. Try searching for another term.
        </p>
      )}

      {/* Modal Popup */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setSelectedItem(null)}
            >
              &#10005;
            </button>
            <div className="overflow-y-auto max-h-96">
              <h2 className="text-lg font-semibold mb-4">
                {selectedItem.chapter} - {selectedItem.section_title}
              </h2>
              <p className="text-sm text-gray-700">
                <span className="font-bold">Chapter Title: </span>
                {selectedItem.chapter_title}
              </p>
              <p className="text-sm text-gray-600 mt-4">
                <span className="font-bold">Section Description: </span>
                {selectedItem.section_desc || "No description available"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Constitution;
