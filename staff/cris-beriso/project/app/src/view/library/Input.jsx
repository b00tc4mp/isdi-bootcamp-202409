export default function Input({ type, id, placeholder }) {
  console.log('Input -> render')

  return <input type={type} id={id} className="w-full box-border bg-slate-100" placeholder={placeholder} />
}

