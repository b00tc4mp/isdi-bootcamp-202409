import './Paragraph.css'

export default function Paragraph({ children, className }) {

    console.log('Paragraph -> render')
    return <p className={"Paragraph" + className}>{children}</p>
}