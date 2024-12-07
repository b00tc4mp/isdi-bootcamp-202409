import logic from '../logic'

import { Label, Input, Button, Form, Field } from './library/index.js'

//create and import and CSS file for style

export default function CreateRecommend({ onCreated }) {
    console.log('CreateRecommend -> render')

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
            recommend: { value: recommend }
        } = form

        try {
            logic.createRecommend(city, country, category, price, link, image, recommend)
                .then(onCreated)
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }  // create backend logic for get country and get city 
    // recommend inner text should be dynamic based on category selection

    return <main className='createrecommend'>
        <Form onSubmit={handleSubmit}>
            <Field>
                <Label>Ciudad</Label>
                <Input type='text' id='city' />
            </Field>

            <Field>
                <Label>País</Label>
                <Input type='text' id='country' />
            </Field>

            <Field>
                <Label>Categoría</Label>
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

            <Field>
                <Label>Preicio</Label>
                <select id="price" defaultValue="">
                    <option value="" disabled>
                        Seleccionar precio
                    </option>
                    <option value="1">€ - Barato</option>
                    <option value="2">€€ - Moderado</option>
                    <option value="3">€€€ - Caro</option>
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
                <Input type='text' id='recommend' />
            </Field>

            <Button type='submit'>Compartir</Button>
        </Form>



    </main>
}
