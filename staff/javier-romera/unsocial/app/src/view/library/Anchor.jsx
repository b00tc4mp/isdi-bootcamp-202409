export default function Anchor({ href, onClick, children, classname }) {
    return <a className={classname} href={href} onClick={onClick}>{children}</a>
}