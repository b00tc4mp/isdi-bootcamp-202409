export default function Label({ htmlFor, children }) {
  return <label htmlFor={htmlFor}>{children}</label>
}

// TODO style with tailwind
