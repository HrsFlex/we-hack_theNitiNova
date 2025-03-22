
import React, { useState } from "react";

const LAWYERS_DB = [
  {
    id: 1,
    name: "Advocate Sharma",
    specialization: "Criminal Law",
    contact: "+91 9876543210",
    location: {
      state: "Madhya Pradesh",
      city: "Jabalpur",
      lat: 23.1815,
      lng: 79.9864,
    },
  },
  {
    id: 2,
    name: "Advocate Verma",
    specialization: "Family Law",
    contact: "+91 9876543211",
    location: {
      state: "Madhya Pradesh",
      city: "Bhopal",
      lat: 23.2599,
      lng: 77.4126,
    },
  },
  {
    id: 3,
    name: "Advocate Singh",
    specialization: "Corporate Law",
    contact: "+91 9876543212",
    location: {
      state: "Madhya Pradesh",
      city: "Jabalpur",
      lat: 23.1815,
      lng: 79.9864,
    },
  },
];

const CITY_COORDS = {
  Jabalpur: { lat: 23.1815, lng: 79.9864 },
  Bhopal: { lat: 23.2599, lng: 77.4126 },
};

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const toRadians = (degree) => (degree * Math.PI) / 180;

  lat1 = toRadians(lat1);
  lon1 = toRadians(lon1);
  lat2 = toRadians(lat2);
  lon2 = toRadians(lon2);

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in kilometers
}

const FindLawyers = () => {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [radius, setRadius] = useState(60000); // Default radius in meters
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const radiusInKm = radius / 1000; // Convert meters to kilometers
    const cityCoord = CITY_COORDS[city];

    if (!cityCoord) {
      alert("City not found");
      return;
    }

    const nearbyLawyers = LAWYERS_DB.filter((lawyer) => {
      if (lawyer.location.state === state) {
        const distance = calculateDistance(
          cityCoord.lat,
          cityCoord.lng,
          lawyer.location.lat,
          lawyer.location.lng
        );
        return distance <= radiusInKm;
      }
      return false;
    }).map((lawyer) => ({
      name: lawyer.name,
      specialization: lawyer.specialization,
      contact: lawyer.contact,
      distance: calculateDistance(
        cityCoord.lat,
        cityCoord.lng,
        lawyer.location.lat,
        lawyer.location.lng
      ).toFixed(2),
    }));

    setResults(nearbyLawyers);
  };

  return (
    <div className="bg-gray-900 text-white p-5 flex flex-col text-center items-center mx-auto">
      <h1 className="text-2xl font-bold mb-4">Find the Nearest Lawyer</h1>
      <div className="flex gap-4 mb-4">
        <select
          className="p-2 bg-white text-black rounded"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="">Select State</option>
          <option value="Madhya Pradesh">Madhya Pradesh</option>
        </select>

        <select
          className="p-2 bg-white text-black rounded"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">Select City</option>
          <option value="Jabalpur">Jabalpur</option>
          <option value="Bhopal">Bhopal</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Select search radius (in meters)</label>
        <input
          type="range"
          min="1000"
          max="100000"
          step="1000"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          className="w-full"
        />
        <p>Searching within a radius of {(radius / 1000).toFixed(2)} km</p>
      </div>

      <button
        onClick={handleSearch}
        className="bg-red-500 text-white px-4 py-2 rounded w-fit"
      >
        Find Lawyers
      </button>

      {results.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-8">Results:</h2>
          <ul className="flex gap-8">
            {results.map((lawyer, index) => (
              <li
                key={index}
                className="mb-2 bg-transparent border border-gray-700 p-5 rounded-xl shadow-xl shadow-gray-600"
              >
                <p>Name: {lawyer.name}</p>
                <p>Specialization: {lawyer.specialization}</p>
                <p>Contact: {lawyer.contact}</p>
                <p>Distance: {lawyer.distance} km</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FindLawyers;
