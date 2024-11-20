export default function Form({ children, onSubmit, classname }) {
    return <form className={classname} onSubmit={onSubmit}>{children}</form>
}