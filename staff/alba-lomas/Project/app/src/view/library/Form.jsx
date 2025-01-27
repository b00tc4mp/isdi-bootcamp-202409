


export default function Form({ children, onSubmit }) {
    console.log('Form -> render')

    return <form className="flex flex-col gap-2 m-4" onSubmit={onSubmit}>{children}</form>
}