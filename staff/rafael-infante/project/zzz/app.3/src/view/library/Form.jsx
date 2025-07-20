export default function Form({ children, onSubmit }) {
  return (
    <form className="Form" onSubmit={onSubmit}>
      {children}
    </form>
  )
}

//TODO style with tailwind
