import './Button.css';

export default function Button({ type = 'button', children, onClick }) {
    console.log('button -> render');

    return (
        <button type={type} className="Button" onClick={onClick}>
            {children}
        </button>
    );
}
