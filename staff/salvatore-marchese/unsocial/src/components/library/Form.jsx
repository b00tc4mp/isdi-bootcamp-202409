import './Form.css'

export default ({ children, onSubmit }) => {
    console.log('Form -> render')
    return (
        <div className={"form-container"}>
            <form className="Form" onSubmit={onSubmit}>{children}</form>
        </div>
    )
}