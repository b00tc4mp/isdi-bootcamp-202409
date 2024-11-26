export default ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className="text-lg">
      {children}
    </label>
  )
}
