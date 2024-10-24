import './Paragraph.css'

function Paragraph({ children, className }) {
    return <p className={"Paragraph" + className}>{children}</p>
}

export default Paragraph