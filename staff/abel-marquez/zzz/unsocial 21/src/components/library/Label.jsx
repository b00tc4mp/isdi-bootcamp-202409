import './Label.css'

function Label ({htmlFor, children}) {
    return <label htmlFor={htmlFor}> {children}</label>
}

export default Label