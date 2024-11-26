export default ({ children, onSubmit }) => {
  return (
    <form className="text-center" onSubmit={onSubmit}>
      {children}
    </form>
  )
}
