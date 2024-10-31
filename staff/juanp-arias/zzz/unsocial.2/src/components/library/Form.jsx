import './Form.css'

export default ({ children, onSubmit }) =>
    <form className="Form" onSubmit={onSubmit}>{children}</form>


