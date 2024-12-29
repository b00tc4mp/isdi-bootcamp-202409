import React, { useState } from "react";
import searchDiveCenters from "../../logic/users/searchDiveCenters.js";

const Search = () => {
  const [city, setCity] = useState(""); // State to hold city input
  const [results, setResults] = useState([]); // State to hold search results
  const [error, setError] = useState(""); // State to handle errors
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  const handleInputChange = (e) => {
    setCity(e.target.value); // Update city input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const data = await searchDiveCenters(city); // Call logic to search dive centers
      setResults(data); // Set results in state
    } catch (err) {
      console.error("Error searching dive centers:", err);
      setError(err.message || "An error occurred while searching.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50 py-8">
      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">Search Dive Centers</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium">
              Enter City:
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={handleInputChange}
              placeholder="e.g., Miami"
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 text-white rounded-md ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <div className="mt-6">
          {results.length > 0 ? (
            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-4">Search Results:</h3>
              <ul className="space-y-4">
                {results.map((center) => (
                  <li key={center._id} className="p-4 border border-gray-300 rounded-lg shadow-md">
                    <h4 className="text-lg font-bold text-blue-700">{center.name}</h4>
                    <p>
                      <strong>Address:</strong> {center.address}, {center.city}, {center.country}
                    </p>
                    <p>
                      <strong>Email:</strong> {center.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {center.phoneNumber}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500 text-center">{isLoading ? "" : "No results to display."}</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Search;