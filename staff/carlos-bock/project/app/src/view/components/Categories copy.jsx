import { useLocation, useNavigate } from 'react-router-dom'
import { Field, Label } from '../library/index.js'

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

            <Field>
                <select id="category" defaultValue="">
                    <option value="" disabled>
                        Seleccionar categoría
                    </option>
                    <option value="1">Trámites</option>
                    <option value="2">Servicios</option>
                    <option value="3">Alimentación</option>
                    <option value="4">Eventos</option>
                    <option value="5">Sanidad</option>
                    <option value="6">Barrios</option>
                    <option value="7">Vivienda</option>
                    <option value="8">Transporte</option>
                </select>
            </Field>


        </main>
    )
}

