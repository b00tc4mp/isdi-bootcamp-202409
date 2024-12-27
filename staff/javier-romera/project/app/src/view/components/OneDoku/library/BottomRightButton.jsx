export default function BottomRightButton({ onClick, disabled, children }) {
    return <button id="8" className="bg-[rgba(175,255,255,0.95)] hover:bg-[rgba(134,224,224,0.95)] transition duration-200 w-full h-full rounded-br-[1rem] border-r-[2px] border-b-[2px] border-[1px] border-[black]" onClick={onClick} disabled={disabled}>{children}</button>
}