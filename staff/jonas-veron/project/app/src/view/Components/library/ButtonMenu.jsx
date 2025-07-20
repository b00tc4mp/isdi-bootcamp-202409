export default ({ type, children, onClick }) => {
  return (
    <button
      type={type}
      className="bg-tertiary w-full min-w-32 rounded text-white font-body border-2 border-accentpink hover:bg-accentgreen focus:outline-none focus:ring-2 focus:ring-accentgreen transition duration-100 py-2 px-2 flex gap-2"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
