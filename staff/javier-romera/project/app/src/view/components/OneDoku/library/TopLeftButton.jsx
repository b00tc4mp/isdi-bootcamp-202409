export default function TopLeftButton({ onClick, disabled, children }) {
    return <button id="0" className="bg-[rgba(175,255,255,0.95)] hover:bg-[rgba(134,224,224,0.95)] transition duration-200 w-full h-full rounded-tl-[1rem] border-t-[2px] border-l-[2px] border border-[black]" onClick={onClick} disabled={disabled}>{children}</button>
}