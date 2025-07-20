export default function TopMiddleButton({ onClick, disabled, children }) {
    return <button id="1" className="bg-[rgba(175,255,255,0.95)] hover:bg-[rgba(134,224,224,0.95)] transition duration-200  w-full h-full border-t-[2px] border-[1px] border-[black]" onClick={onClick} disabled={disabled}>{children}</button>
}