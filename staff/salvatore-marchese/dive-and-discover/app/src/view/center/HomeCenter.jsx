import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
/* import { getUserName,  getUserCenter  } from '../logic/users/index.js'  */
import logic from '../../logic/users/index.js'


// HomeCenter component to display business details (view-only)
const HomeCenter = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
/*   console.log(logic)
 */
  useEffect(() => {
    // Fetch the user name first
    logic.getUserName()
      .then(name => {
        setUserName(name)
        // Fetch the full user details based on the user email
        return logic.getUserCenter()  
      })
      .then(fetchedUser => {
        setUser(fetchedUser)  // Set the full user data (name, address, postcode, etc.)
      })
      .catch(err => {
        console.error("Error fetching user details:", err)
        setError(err.message)
        navigate('/login')  // Navigate to login if error occurs
      })
  }, [navigate])

  const onViewProfileInfo = () => { navigate('/center-info')}

  // If user data is still being fetched, show loading message
  if (!user) {
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
          <strong>Business Name:</strong> {user.name || "Not Available"}
        </p>

        <p className="text-lg text-gray-800">
          <strong>Address:</strong> {user.address || "Not Available"}
        </p>

        <p className="text-lg text-gray-800">
          <strong>Postcode:</strong> {user.postcode || "Not Available"}
        </p>

        <p className="text-lg text-gray-800">
          <strong>Country:</strong> {user.country || "Not Available"}
        </p>

        <p className="text-lg text-gray-800">
          <strong>City:</strong> {user.city || "Not Available"}
        </p>
      </div>

      {/* Opening Time Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-blue-600">Opening Time</h2>
        <ul className="mt-4 space-y-2">
          {user.openingHours?.length ? (
            user.openingHours.map((entry, index) => (
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


