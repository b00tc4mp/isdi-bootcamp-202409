import './Label.css'

export default function Label({ htmlFor, children, className }) {
    // console.log('Label -> render')

    return <label htmlFor={htmlFor} className={className}>{children}</label>
}