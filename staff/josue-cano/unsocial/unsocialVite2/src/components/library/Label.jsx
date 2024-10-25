import './Label.css'

function Label({ htmlFor, Children }) {
    return <label htmlFor={htmlFor} className="Label">{Children}  <input placeholder="username" type="text" id="username" style={{ width: '100%', boxSizing: 'border-box' }} /></label>
}

export default Label