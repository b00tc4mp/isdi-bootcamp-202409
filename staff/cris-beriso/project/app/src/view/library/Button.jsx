export default function Button({ type, children, onClick }) {
  console.log('Button -> render')

  return <button type={type} className="Button w-12 bg-[var(--button-color)] text-black rounded-lg" onClick={onClick}>{children}</button>
}

