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
        <main className='max-w-2xl mx-auto bg-white shadow-lg rounded mt-8'>
            <h3 className='text-2xl font-semibold text-neutralDark mb-6'>Recomendaciones</h3>
            <Form onSubmit={handleOnSubmit}>
                <Field className='flex flex-col gap-3'>
                    <Label className='text-lg font-medium text-neutralDark'>Categoría</Label>
                    <select className='p-2 border border-cardBorder rounded focus:outline-none focus:ring-2 focus:ring-primary'
                        id='category' value={selectedCategory}
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
                    <select className='p-2 border border-cardBorder rounded focus:outline-none focus:ring-2 focus:ring-primary'
                        id='country' value={selectedCountry}
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

                    <Button className='w-full bg-primary text-white py-2 rounded hover:bg-primary-dark'
                        type='submit'>Buscar</Button>
                </Field>


            </Form>
        </main>
    )
}

