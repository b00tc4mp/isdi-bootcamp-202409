export default ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className="text-lg text-white">
      {children}
    </label>
  )
}
