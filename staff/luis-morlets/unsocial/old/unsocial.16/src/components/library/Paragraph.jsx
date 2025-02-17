import './Paragraph.css'

export default ({ children, className }) => {

    console.log('Paragraph -> render')
    return <p className={"Paragraph" + className}>{children}</p>
}