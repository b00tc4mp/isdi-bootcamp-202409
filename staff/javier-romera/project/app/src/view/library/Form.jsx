export default function Form({ id, children, onSubmit, className }) {
    return <form id={id} className={className} onSubmit={onSubmit}>{children}</form>
}