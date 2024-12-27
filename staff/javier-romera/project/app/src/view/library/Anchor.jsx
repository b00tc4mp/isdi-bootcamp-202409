export default function Anchor({ href, onClick, children, className }) {
    return <a className={className} href={href} onClick={onClick}>{children}</a>
}