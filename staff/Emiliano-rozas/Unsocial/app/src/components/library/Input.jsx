import './Input.css'

function Input({ type, id, name, placeholder }) {
    return < input type={type} id={id} name={name} placeholder={placeholder} className="bg-white font-inherit w-[95%] px-4 py-2 mb-2 border border-[#fcf9f9] rounded-md caret-[#7F462C]" />
}

export default Input