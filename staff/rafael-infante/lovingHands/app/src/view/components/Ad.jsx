export default function Ad({ ad }) {
  const { id, author, files, text, date } = ad

  console.log(ad)

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow">
      {/* Image */}
      <img src={files[0]} className="w-full h-32 object-cover rounded-md mb-3" />
      {/* Description */}
      <p className="text-gray-800 font-medium">{text}</p>
      {/* Author */}
      <p className="text-sm text-gray-500 mt-2">Posted by: {author.name}</p>
    </div>
  )
}
