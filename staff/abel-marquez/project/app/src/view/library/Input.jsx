export default function Input({ type, id, placeholder }) {
    // console.log('Input -> render')

    return <input type={type} id={id} placeholder={placeholder} className="w-full px-3 py-2 border border-[#AEAEAE] rounded-lg text-base placeholder-[#9E9E9E] focus:outline-none focus:border-black focus:ring-1 focus:ring-black"/>


}