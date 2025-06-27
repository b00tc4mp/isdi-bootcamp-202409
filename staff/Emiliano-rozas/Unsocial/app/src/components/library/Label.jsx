export default function Label({ htmlFor, children }) {

    console.log('Label -> render')

    return <label class='block mb-[5px] font-bold' htmlFor={htmlFor} className={"label"}>{children}</label>
}
