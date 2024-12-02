import './Label.css'

export default function Label({ htmlFor, children }) {
    console.log('Label -> render')

    return <label htmlFor={htmlFor} className='Label'>{children}</label>
}