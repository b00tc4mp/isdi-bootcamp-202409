export default function Label({ htmlFor, children }) {
    return <label className="[&::before]:content-['['] [&::after]:content-[']'] text-sm" htmlFor={htmlFor}>{children}</label>
}