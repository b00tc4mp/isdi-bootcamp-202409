export default ({ type, children, onClick }) => {
  return (
    <button
      type={type}
      className="bg-accentpink w-52 mt-6 h-10 rounded-2xl text-white font-bold border-2 border-transparent hover:bg-accentgreen hover:border-accentpink focus:outline-none focus:ring-2 focus:ring-accentgreen transition duration-300"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
