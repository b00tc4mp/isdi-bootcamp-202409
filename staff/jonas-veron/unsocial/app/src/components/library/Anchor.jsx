export default function Anchor({ href, onClick, children }) {
  return (
    <a
      className="no-underline text-xl hover:underline hover:text-blue-600"
      href={href}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
