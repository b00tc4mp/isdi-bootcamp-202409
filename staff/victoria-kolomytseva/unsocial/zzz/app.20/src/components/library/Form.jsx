import './Form.css'

export default ({ children, onSubmit }) => {
    console.log('Form -> render')

    return <form className="Form" onSubmit={onSubmit}>{children}</form>
}

