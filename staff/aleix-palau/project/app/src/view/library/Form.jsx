export default function Form({ children, onSubmit }) {

    return <form
        className="flex flex-col"
        onSubmit={onSubmit}
    >{children}</form>
}