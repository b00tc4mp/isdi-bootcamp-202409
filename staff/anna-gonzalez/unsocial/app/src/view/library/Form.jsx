export default function Form({ children, onSubmit }) {
    console.log('Form -> render')

    return <form className="flex flex-col justify-center items-center text-left p-4 gap-4 m-4 h-auto bg-[#92FF9D] rounded-2xl border-black border-2 text-black w-72 mt-16" onSubmit={onSubmit}>{children}</form>
}