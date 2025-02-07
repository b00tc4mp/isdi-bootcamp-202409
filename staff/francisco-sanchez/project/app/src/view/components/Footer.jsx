import { useLocation } from 'react-router-dom'

export default function Footer() {
    const location = useLocation()

    return (
        <footer className="bg-color_darkBlue text-white p-4 flex flex-col md:flex-row justify-between items-center h-20">
            <p className="text-sm">
                © {new Date().getFullYear()} Hourify. All rights reserved.
            </p>
            <p className="text-sm">
                Contact us at: <a href="mailto:hola@nomadwebs.com" className="text-color_primary hover:underline">hola@nomadwebs.com</a>
            </p>
        </footer>
    )
}