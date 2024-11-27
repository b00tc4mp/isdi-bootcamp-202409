// import './Form.css'

export default function Form({ children, onSubmit }) {
    console.log('Form -> render')

    return <form className="p-7" onSubmit={onSubmit}>{children}</form>
}
