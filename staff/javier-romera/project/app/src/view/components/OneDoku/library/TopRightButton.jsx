export default function TopRightButton({ onClick, disabled, children }) {
    return <button id="2" className="bg-[rgba(175,255,255,0.95)] hover:bg-[rgba(134,224,224,0.95)] transition duration-200 w-full h-full rounded-tr-[1rem] border-t-[2px] border-r-[2px] border-[1px] border-[black]" onClick={onClick} disabled={disabled}>{children}</button>
}