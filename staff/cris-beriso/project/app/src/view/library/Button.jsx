export default function Button({ type, children, onClick }) {
  console.log('Button -> render')

  return <button type={type} className="pl-2 pr-2 Button bg-button text-white rounded-lg" onClick={onClick}>{children}</button>
}

