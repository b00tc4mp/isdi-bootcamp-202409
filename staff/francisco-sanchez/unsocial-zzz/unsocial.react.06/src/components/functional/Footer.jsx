import './Footer.css'

function Footer() {
    return <footer className='Footer'>
        <p className='texto-info-pie'>Versión con Vite de la red social mas Unsocial de la historia. En esta versión componetizamos prácticamente todos los elementos y sus css.</p>
        <nav className='FooterMenu'>
            <ul>
                <li><a href='#'>Privacy policy</a></li>
                <li><a href='#'>Cokies Law</a></li>
                <li><a href='#'>RGPD legal</a></li>
            </ul>
        </nav>

    </footer>
}

export default Footer