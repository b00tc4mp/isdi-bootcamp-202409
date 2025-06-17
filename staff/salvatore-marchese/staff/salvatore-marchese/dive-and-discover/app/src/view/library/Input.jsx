export default function Input({ type, id }) {
    return (
        <input 
            type={type} 
            id={id} 
            className="w-[200px] box-border bg-gray-100 font-inherit border-[var(--color)] border-2 self-center h-[30px]"
        />
    );
}