import './Field.css'

export default ({ children }) => {
    console.log('Field -> render')

    return <div className="Field">{children}</div>
}

