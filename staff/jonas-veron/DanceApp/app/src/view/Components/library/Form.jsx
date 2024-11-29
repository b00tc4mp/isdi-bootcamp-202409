export default function Form({ children, onSubmit }) {
  return (
    <form className="text-center" onSubmit={onSubmit}>
      {children}
    </form>
  )
}
