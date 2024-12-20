//import './Button.css'

export default function Button({ type, children, theme, onClick }) {
    console.log('Button -> render')

    return <button type={type} className='px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark' onClick={onClick}>{children}</button>
}