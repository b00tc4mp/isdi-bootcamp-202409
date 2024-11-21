export default function Paragraph({ children, className }) {

    console.log('Paragraph -> render')
    return <p className={className}>{children}</p>
}