import './Label.css'

export default function Label({ htmlfor, children }) {
     return <label hmtlfor={htmlfor} className="Label">{children}</label>
}

