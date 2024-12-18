import logic from '../logic'
import { useState } from 'react'

import { Label, Input, Button, Form, Field } from './library/index.js'

//create and import and CSS file for style

export default function CreateRecommend({ onCreated }) {
    console.log('CreateRecommend -> render')

    const [selectedCountry, setSelectedCountry] = useState('')

    const countries = [
        'Alemania', 'Austria', 'Bélgica', 'Bulgaria', 'Chequia', 'Chipre', 'Croacia',
        'Dinamarca', 'Eslovaquia', 'Eslovenia', 'España', 'Estonia', 'Finlandia',
        'Francia', 'Grecia', 'Hungría', 'Islandia', 'Italia', 'Letonia', 'Liechtenstein',
        'Lituania', 'Luxemburgo', 'Malta', 'Noruega', 'Países Bajos', 'Polonia',
        'Portugal', 'Reino Unido', 'Rumanía', 'Suecia', 'Suiza'
    ]

    const handleSubmit = event => {
        event.preventDefault()

        const { target: form } = event

        const {
            city: { value: city },
            country: { value: country },
            category: { value: category },
            price: { value: price },
            link: { value: link },
            image: { value: image },
            recommend: { value: recommend },
            subject: { value: subject }
        } = form

        try {
            logic.createRecommend(city, country, parseInt(category, 10), parseInt(price, 10), link, image, recommend, subject)
                .then(onCreated)
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    return <main className='max-w-3xl mx-auto bg-white shadow-lg rounded mt-10'>
        <Form onSubmit={handleSubmit}>
            <Field>
                <Label>Ciudad</Label>
                <Input type='text' id='city' />
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
            </Field>

            <Field>
                <Label>Categoría</Label>
                <select id="category" defaultValue="">
                    <option value="" disabled>
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
                <Label>Tema</Label>
                <Input type='text' id='subject'></Input>
            </Field>

            <Field>
                <Label>Precio</Label>
                <select id='price' defaultValue=''>
                    <option value='' disabled>
                        Seleccionar precio
                    </option>
                    <option value='1'>€ - Barato</option>
                    <option value='2'>€€ - Moderado</option>
                    <option value='3'>€€€ - Caro</option>
                </select>
            </Field>

            <Field>
                <Label>Enlace</Label>
                <Input type='text' id='link' />
            </Field>

            <Field>
                <Label>Foto</Label>
                <Input type='text' id='image' />
            </Field>

            <Field>
                <Label>Recomendación o Guía</Label>
                <textarea className='p-2 border border-black rounded focus:outline-none focus:ring-2 focus:ring-primary'
                    type='text' id='recommend' />
            </Field>

            <Button type='submit'>Compartir</Button>
        </Form>



    </main>
}
