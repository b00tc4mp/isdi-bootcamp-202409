import './Input.css';

export default function Input({ type, id }) {

    console.log('Input -> render')
    return <input type={type} id={id} className="Input" />
}
