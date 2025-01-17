import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import searchDiveCenters from "../../logic/users/searchDiveCenters.js";
import dayDictionary from "../../util/daysDictionary.js";

const Search = () => {
  const [city, setCity] = useState(""); // State to hold city input
  const [results, setResults] = useState([]); // State to hold search results
  const [error, setError] = useState(""); // State to handle errors
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);


  const openModal = (data) => {
    setModalData(data); // Set the data for the modal
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null); // Clear the data when the modal is closed
  };

  const handleInputChange = (e) => {
    setCity(e.target.value); // Update city input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const data = await searchDiveCenters(city); // Call logic to search dive centers
      console.log(data)
      setResults(data); // Set results in state
    } catch (err) {
      console.error("Error searching dive centers:", err);
      setError(err.message || "An error occurred while searching.");
    } finally {
      setIsLoading(false);
    }
  };
  console.log(modalData)

  /* const getDayString = (day) => {
    if (day === 1) return "Monday";
    else if (day === 2) return "Tuesday";
    else if (day === 3) return "Wednesday";
    else if (day === 4) return "Thursday";
    else if (day === 5) return "Friday";
    else if (day === 6) return "Saturday";
    else if (day === 7) return "Sunday";
  } */
  return (
    <main
      className="min-h-screen flex flex-col items-center bg-cover bg-center py-8"
      style={{
        backgroundImage:
          "url('https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/df/2b/0e/getlstd-property-photo.jpg?w=1200&h=1200&s=1')",
      }}
    >
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
              placeholder="e.g., Barcelona"
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 text-yellow-400 rounded-md ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
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
                    <h4 className="text-lg font-bold text-blue-700 underline"
                    >
                      <a onClick={() => openModal(center)}>{center.name}</a>
                    </h4>
                  </li>
                ))}
              </ul>
              <button
                onClick={() =>
                  navigate(`/faunaFlora/${results[0]?.city}`)
                }
                className="mt-4 bg-blue-500 text-yellow-400 py-2 px-4 rounded-md hover:bg-blue-600 w-full sm:w-auto"
              >
                Find out more about this area
              </button>
            </div>
          ) : (
            <p className="text-gray-500 text-center">{isLoading ? "" : "No results to display."}</p>
          )}
        </div>


        {isModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={closeModal}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg w-96"
              onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside it
            >
              <h2 className="text-xl font-semibold mb-4">{modalData?.name}</h2>
              <p className="text-gray-600 mb-4">{modalData?.description}</p>

              <p>
                <strong>Address:</strong> {modalData?.address}, {modalData.postcode}, {modalData.city}, {modalData.country}
              </p>
              <p>
                <strong>Email:</strong> {modalData.email}
              </p>
              <p>
                <strong>Telephone:</strong> {modalData.telephone}
              </p>

              <ul className="mt-4">
                {modalData?.openingHours?.map((entry, index) => (
                  <li key={index} className="flex justify-between items-center text-lg text-blue-600">
                    <span>{dayDictionary[entry.day]}</span>
                    <span>{entry.openTime} - {entry.closeTime}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={closeModal}
                className="px-4 py-2 text-yellow-400 bg-red-500 rounded hover:bg-red-600"
              >
                Close Modal
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Search