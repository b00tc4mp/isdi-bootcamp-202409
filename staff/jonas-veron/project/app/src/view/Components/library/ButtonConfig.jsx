export default ({ type, children, onClick }) => {
  return (
    <button
      type={type}
      className="bg-tertiary w-full mt-6 h-10 rounded-2xl text-white font-bold font-body border-2 border-transparent hover:bg-accentgreen  focus:outline-none focus:ring-2 focus:ring-accentgreen transition duration-300 text-center"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
