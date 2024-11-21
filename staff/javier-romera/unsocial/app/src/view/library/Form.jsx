export default function Form({ children, onSubmit, classname }) {
    return <form className="flex justify-center flex-col items-center w-full gap-2" onSubmit={onSubmit}>{children}</form>
}