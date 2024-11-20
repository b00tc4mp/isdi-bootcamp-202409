import './Button.css'

export default function Button({ type, children, onClick }) {
    console.log('Button -> render')

    return <button type={type} class="w-full bg-[#7F462C] text-white border-none rounded-md mt-2 cursor-pointer transition-all duration-500 ease-in-out drop-shadow-md px-2.5 py-1 text-[12px] mx-1.5" onClick={onClick}>{children} </button>
}

