import './Form.css'

function Form({ children, onSubmit }) {
    return <form className="Form" onSubmit={onSubmit}>{children}</form>
}
export default Form