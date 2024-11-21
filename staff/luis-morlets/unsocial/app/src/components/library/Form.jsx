export default function Form({ children, onSubmit }) {

    console.log('Form -> render')
    return <form className="flex flex-col justify-evenly min-w-24 w-full" onSubmit={onSubmit}>
        {children}</form>
}