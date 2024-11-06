import './Form.css'

export default ({ children, onSubmit }) => {
    return <form className="Form" onSubmit={onSubmit}>{children}</form>

}

