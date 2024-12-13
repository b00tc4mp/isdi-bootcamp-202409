import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Field, Label, Button } from '../library/index.js'
import Alert from '../components/Alert.jsx'

export default function Categories() {
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedCountry, setSelectedCountry] = useState('')
    const navigate = useNavigate()

    const countries = [
        'Alemania', 'Austria', 'Bélgica', 'Bulgaria', 'Chequia', 'Chipre', 'Croacia',
        'Dinamarca', 'Eslovaquia', 'Eslovenia', 'España', 'Estonia', 'Finlandia',
        'Francia', 'Grecia', 'Hungría', 'Islandia', 'Italia', 'Letonia', 'Liechtenstein',
        'Lituania', 'Luxemburgo', 'Malta', 'Noruega', 'Países Bajos', 'Polonia',
        'Portugal', 'Reino Unido', 'Rumanía', 'Suecia', 'Suiza'
    ]

    const handleOnSubmit = e => {
        e.preventDefault()

        if (selectedCategory && selectedCountry) {
            navigate(`/categories/${selectedCategory}/countries/${selectedCountry}`)
        } else {
            Alert('Por favor selecciona una categoría y un país')
        }
    }

    return (
        <main className='categories'>
            <h3>Recomendaciones</h3>
            <Form onSubmit={handleOnSubmit}>
                <Field>
                    <Label>Categoría</Label>
                    <select id='category' value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}>

                        <option value='' disabled>
                            Seleccionar categoría
                        </option>
                        <option value='1'>Trámites</option>
                        <option value='2'>Servicios</option>
                        <option value='3'>Alimentación</option>
                        <option value='4'>Eventos</option>
                        <option value='5'>Sanidad</option>
                        <option value='6'>Barrios</option>
                        <option value='7'>Vivienda</option>
                        <option value='8'>Transporte</option>
                    </select>
                </Field>


                <Field>
                    <Label>País</Label>
                    <select id='country' value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}>

                        <option value='' disabled>
                            Seleccionar país
                        </option>
                        {countries.map((country, i) => (
                            <option key={i} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>

                    <Button type='submit'>Buscar</Button>
                </Field>


            </Form>
        </main>
    )
}

