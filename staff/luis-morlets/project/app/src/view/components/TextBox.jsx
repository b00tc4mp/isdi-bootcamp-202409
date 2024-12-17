import useTypedMessage from '../../hooks/useTypedMessage'

export default function TextBox({ message }) {
    console.log('textbox -> render')

    const typedMessage = useTypedMessage(message)

    return <div className="w-full h-[25%] bg-white fixed bottom-0 text-black text-2xl text-center content-center">
        <div>{typedMessage}</div>
        <button className="bg-red-700 text-white text-xl px-6 rounded-md border-4 border-black shadow-lg transform transition-transform hover:scale-105 hover:bg-red-800 active:bg-red-600">Skip</button>
    </div>
}