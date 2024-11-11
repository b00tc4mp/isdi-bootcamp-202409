import './Anchor.css'

export default function Anchor({ href, onClick, children }) {
    console.log('Anchor-> render')


    return <a className="Anchor" href={href} onClick={onClick}>{children}</a>

}

