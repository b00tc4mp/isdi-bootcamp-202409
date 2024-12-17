export default function Label({ htmlFor, children }) {

    console.log('Label -> render')
    return <label htmlFor={htmlFor} className="text-2xl self-start">
        {children}
    </label>
}