/* import './Form.css' */

export default function Form({ children, onSubmit }) {
    console.log('Form -> render');

    return (
        <form
            className="flex flex-col gap-6 m-4"
            onSubmit={onSubmit}>
            {children}
        </form>
    );
}