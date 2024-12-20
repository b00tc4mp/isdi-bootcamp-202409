import './Label.css'

export default ({ htmlFor, children }) => {
    console.log('Label -> render')

    return <label htmlFor={htmlFor} className="Label">{children}</label>
}
