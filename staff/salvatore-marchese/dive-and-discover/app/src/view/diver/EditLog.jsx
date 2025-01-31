import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import getLog from "../../logic/log/getLog.js"
import logic from "../../logic/log/index.js";

const EditLog = () => {
  const { logbookId } = useParams();
  const navigate = useNavigate();
  const [logDetails, setLogDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if(logbookId){
      fetchLogDetails(logbookId);
    }
  }, [logbookId]);

  const fetchLogDetails = async (logbookId) => {
    try {
      setLoading(true)
      const response = await getLog(logbookId);

      setLogDetails(response[0]); // Populate logDetails with fetched data
      setLoading(false);

    } catch (err) {
      setError("Failed to fetch log details. Please try again.");
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(value)
    setLogDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await logic.updateLog(logbookId, logDetails);
      navigate("/dive-history");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <main className="EditLog">
      <form
        id="editDiveLogForm"
        className="space-y-6 bg-gray-100 p-6 rounded-lg shadow-md max-w-full sm:max-w-7xl md:max-w-8xl lg:max-w-9xl xl:max-w-full mx-auto"
        onSubmit={handleFormSubmit}
      >
        <h2 className="text-2xl font-bold mb-6">Edit Dive Log</h2>

        <div>
          <label htmlFor="divingSite" className="block text-sm font-medium">Diving Site:</label>
          <input
            type="text"
            id="diveSite"
            name="diveSite"
            value={logDetails.diveSite || ""}
            onChange={handleInputChange}
            placeholder={logDetails?.divingSite || "Enter diving site"}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={logDetails.date.split('T')[0] || ""}
            onChange={handleInputChange}
            placeholder={logDetails.date || "Select a date"}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label htmlFor="depth" className="block text-sm font-medium">Depth (m):</label>
          <input
            type="number"
            id="depth"
            name="depth"
            value={logDetails.depth || ""}
            onChange={handleInputChange}
            placeholder={logDetails.depth || "Enter depth"}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium">Time (mins):</label>
          <input
            type="number"
            id="time"
            name="time"
            value={logDetails.time || ""}
            onChange={handleInputChange}
            placeholder={logDetails.time || "Enter time"}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label htmlFor="weather" className="block text-sm font-medium">Weather:</label>
          <input
            type="text"
            id="weather"
            name="weather"
            value={logDetails.weather || ""}
            onChange={handleInputChange}
            placeholder={logDetails.weather || "e.g., Sunny, Cloudy"}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label htmlFor="temperature" className="block text-sm font-medium">Temperature (°C):</label>
          <input
            type="number"
            id="temperature"
            name="temperature"
            value={logDetails.temperature || ""}
            onChange={handleInputChange}
            placeholder={logDetails.temperature || "Enter temperature"}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label htmlFor="visibility" className="block text-sm font-medium">Visibility:</label>
          <input
            type="text"
            id="visibility"
            name="visibility"
            value={logDetails.visibility || ""}
            onChange={handleInputChange}
            placeholder={logDetails.visibility || "e.g., Great, Good"}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label htmlFor="waves" className="block text-sm font-medium">Waves:</label>
          <input
            type="text"
            id="waves"
            name="waves"
            value={logDetails.waves || ""}
            onChange={handleInputChange}
            placeholder={logDetails.waves || "e.g., Calm, Choppy"}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label htmlFor="wetSuit" className="block text-sm font-medium">Wet Suit (mm):</label>
          <input
            type="number"
            id="wetSuit"
            name="wetSuit"
            value={logDetails.wetSuit || ""}
            onChange={handleInputChange}
            placeholder={logDetails.wetSuit || "e.g., 0, 3, 5"}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label htmlFor="weight" className="block text-sm font-medium">Weight (Kg):</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={logDetails.weight || ""}
            onChange={handleInputChange}
            placeholder={logDetails.weight || "Enter weight"}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label htmlFor="tankSize" className="block text-sm font-medium">Tank Size (Lt):</label>
          <input
            type="number"
            id="tankSize"
            name="tankSize"
            value={logDetails.tankSize || ""}
            onChange={handleInputChange}
            placeholder={logDetails.tankSize || "e.g., 8, 10, 12"}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label htmlFor="tankBar" className="block text-sm font-medium">Tank Bar:</label>
          <input
            type="number"
            id="tankBar"
            name="tankBar"
            value={logDetails.tankBar || ""}
            onChange={handleInputChange}
            placeholder={logDetails.tankBar || "Enter tank pressure"}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label htmlFor="feeling" className="block text-sm font-medium">Feeling:</label>
          <input
            type="text"
            id="feeling"
            name="feeling"
            value={logDetails.feeling || ""}
            onChange={handleInputChange}
            placeholder={logDetails.feeling || "Enter your feeling"}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium">Notes:</label>
          <textarea
            id="notes"
            name="notes"
            value={logDetails.notes || ""}
            onChange={handleInputChange}
            placeholder={logDetails.notes || "Max 400 characters"}
            className="w-full border rounded-md p-2 h-40"
            maxLength="400"
          ></textarea>
        </div>

        <button type="submit" className="bg-blue-500 text-yellow-400 py-2 px-4 rounded-md hover:bg-blue-600">
          Save Changes
        </button>
        <button
          type="button"
          onClick={() => navigate("/dive-history")}
          className="ml-4 bg-red-500 text-yellow-400 py-2 px-4 rounded-md hover:bg-gray-400">
          Cancel
        </button>
      </form>
    </main>
  );
};

export default EditLog;