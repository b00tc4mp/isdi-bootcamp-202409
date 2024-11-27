// import './Anchor.css'

export default function Anchor({ href, onClick, children }) {
    console.log('Anchor-> render')


    return <a className="text-center block mx-auto mb-5 text-[#7F462C] transition-all duration-500 ease-in-out hover:text-[#cc4b0f]" href={href} onClick={onClick}>{children}</a>

}


