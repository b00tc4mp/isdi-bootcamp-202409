export default function Button({ type, children, onClick }) {
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  )
}

// TODO style with Tailwind classes
