export default function Paragraph({ children, ...nextProps }) {
    return <p {...nextProps}>{children}</p>
}