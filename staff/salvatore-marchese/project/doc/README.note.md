RENDER HOME-CENTER :  
  
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
      {/* Display the business name and make it a clickable link */}
      <h1 className="text-3xl font-semibold text-blue-500">
        <a href={business.website || '#'} target="_blank" rel="noopener noreferrer">
          {business.name || "Business Name"}
        </a>
      </h1>

      {/* Display the business address */}
      <p className="mt-2 text-gray-700">
        <strong>Address:</strong> {business.address || "Not Available"}
      </p>

      {/* Display the business phone number with a link to call it */}
      <p className="mt-2 text-gray-700">
        <strong>Phone:</strong> <a href={`tel:${business.phone || ""}`} className="text-blue-500">{business.phone || "Not Available"}</a>
      </p>

      {/* Display the business timetable */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Opening Time</h2>
        <ul className="mt-2 space-y-2">
          {/* Loop through the timetable entries and display each day and its corresponding time */}
          {timetable.map((entry, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{entry.day}:</span> {/* Display the day of the week */}
              <span>{entry.time}</span> {/* Display the time for that day */}
            </li>
          ))}
        </ul>
      </div>

      {/* Link to the profile page for editing */}
      <div className="mt-6 text-center">
        <a href="/profile" className="text-blue-500 underline">
          Edit your profile
        </a>
      </div>
    </div>
  )