import './Form.css'

export default function Form({ children, onSubmit }) {
    console.log('Form -> render')

    return <form className='Form' onSubmit={onSubmit}>{children}</form>
}