export default function DisabledLocationButton({ id, className, onClick }) {
    return <button className={`w-[50px] h-[50px] ${className}`} onClick={onClick} id={id} style={{ backgroundImage: "url('/images/location_disabled.png')" }}></button>
}