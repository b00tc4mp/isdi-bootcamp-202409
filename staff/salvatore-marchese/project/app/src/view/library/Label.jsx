/* import './Label.css' */

/* export default function Label({ htmlFor, children }) {
    return <label htmlFor={htmlFor} className="Label">{children}</label>
} */
    export default function Label({ htmlFor, children }) {
        return <label htmlFor={htmlFor} className="font-bold self-center mr-2">{children}</label>;
    }