export default function Form({ children, onSubmit }) {
  return (
    <form className="text-center w-full p-8" onSubmit={onSubmit}>
      {children}
    </form>
  )
}
