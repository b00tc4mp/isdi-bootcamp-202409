import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' 
import logic from '../../logic/users/index.js'

// HomeCenter component to display business details (view-only)
const HomeCenter = () => {
  const navigate = useNavigate()
  //const [userName, setUserName] = useState('')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
/*   console.log(logic)
 */
  useEffect(() => {
    // Fetch the center data
    logic.getUserCenter()
      .then(centerInfo => {
        setData(centerInfo)  // Set the center data info (name, address, postcode, etc.)
      })
      .catch(err => {
        console.error("Error fetching center details:", err)
        setError(err.message)
        navigate('/login')  // Navigate to login if error occurs
      })
  }, [navigate])

  const onViewProfileInfo = () => { navigate('/profile')}

  // If the data is still being fetched, show loading message
  if (!data) {
    return <p>Loading...</p>
  }

  // If error occurred, show error message
  if (error) {
    return <p>Error: {error}</p>
  }


  const getDayString = (day) => {
    if (day === 1) return "Monday";
    else if (day === 2) return "Tuesday";
    else if (day === 3) return "Wednesday";
    else if (day === 4) return "Thursday";
    else if (day === 5) return "Friday";
    else if (day === 6) return "Saturday";
    else if (day === 7) return "Sunday";
  }

  return (
    <main className="p-8 bg-gray-100 rounded-lg shadow-lg max-w-4xl mx-auto">
      {/* Registration Details Section */}
      <h1 className="text-3xl font-semibold text-blue-600 mb-6">User Details</h1>
      
      <div className="space-y-4">
        <p className="text-lg text-gray-800">
          <strong>Business Name:</strong> {data.name || "Not Available"}
        </p>

        <p className="text-lg text-gray-800">
          <strong>Address:</strong> {data.address || "Not Available"}
        </p>

        <p className="text-lg text-gray-800">
          <strong>Postcode:</strong> {data.postcode || "Not Available"}
        </p>

        <p className="text-lg text-gray-800">
          <strong>Country:</strong> {data.country || "Not Available"}
        </p>

        <p className="text-lg text-gray-800">
          <strong>City:</strong> {data.city || "Not Available"}
        </p>

        <p className="text-lg text-gray-800">
          <strong>Telephone:</strong> {data.telephone || "Not Available"}
        </p>
      </div>

      {/* Opening Time Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-blue-600">Opening Time</h2>
        <ul className="mt-4 space-y-2">
          {data.openingHours?.length ? (
            data.openingHours.map((entry, index) => (
              <li key={index} className="flex justify-between items-center text-lg text-gray-800">
                <span>{getDayString(entry.day)}</span>
                <span>{entry.openTime} - {entry.closeTime}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No opening time available.</p>
          )}
        </ul>
      </div>
      <a href="" onClick={onViewProfileInfo}>Edit Business Information📝</a>
    </main>
  )
}

export default HomeCenter


