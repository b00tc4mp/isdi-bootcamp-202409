export default function Container({ children, ...nextProps }) {
    return <div{...nextProps}>{children}</div>
}