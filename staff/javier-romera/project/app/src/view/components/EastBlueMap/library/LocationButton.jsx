export default function LocationButton({ className, id, onClick }) {
    return <button id={id} className={`w-[50px] h-[50px] ${className}`} onClick={onClick} style={{ backgroundImage: "url('/images/location.png')" }}></button>
}