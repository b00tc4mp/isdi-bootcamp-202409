export default ({ type, id, placeholder }) => {
  return (
    <input
      type={type}
      id={id}
      required
      className="w-full max-w-96 h-10 p-2 text-white bg-transparent border-2 border-accentpink rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition duration-300 placeholder-gray-400 hover:bg-pink-500 hover:bg-opacity-10 focus:ring-tertiary"
      // autoComplete="off"
      placeholder={placeholder}
    />
  )
}
