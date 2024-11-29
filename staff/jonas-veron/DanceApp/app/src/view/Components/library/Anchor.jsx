export default function Anchor({ href, onClick, children }) {
  return (
    <a
      className="no-underline text-xl hover:underline hover:text-accentgreen text-white cursor-pointer pt-4 text-sm"
      href={href}
      onClick={onClick}
    >
      {children}
    </a>
  )
}
