import { useLocation, useNavigate } from 'react-router-dom'

export default function Categories() {

    const navigate = useNavigate()

    const handleCategoryClick = (id) => {
        navigate(`/categories/${id}`)
    }

    return (
        <main className='categories'>
            <h1>Categorías</h1>
            <ul>
                <li
                    onClick={() => handleCategoryClick(1)}
                >Trámites</li>

                <li
                    onClick={() => handleCategoryClick(2)}
                >Servicios</li>

                <li
                    onClick={() => handleCategoryClick(3)}
                >Alimentación</li>

                <li
                    onClick={() => handleCategoryClick(4)}
                >Eventos</li>

                <li
                    onClick={() => handleCategoryClick(5)}
                >Sanidad</li>

                <li
                    onClick={() => handleCategoryClick(6)}
                >Barrios</li>

                <li
                    onClick={() => handleCategoryClick(7)}
                >Vivienda</li>

                <li
                    onClick={() => handleCategoryClick(8)}
                >Transporte</li>
            </ul>
        </main>
    )
}

