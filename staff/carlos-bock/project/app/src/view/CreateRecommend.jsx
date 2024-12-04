import { main } from 'ts-node/dist/bin'
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
            imageUrl: { value: imageURL },
            recommend: { value: recommend }
        } = form

        try {
            logic.CreateRecommend(city, country, category, price, link, imageURL, recommend)
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

    return <main className='CreateRecommend'>
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
                <Input type='number' id='category' />
            </Field>

            <Field>
                <Label>Preicio</Label>
                <Input type='number' id='price' />
            </Field>

            <Field>
                <Label>Enlace</Label>
                <Input type='text' id='link' />
            </Field>

            <Field>
                <Label>Foto</Label>
                <Input type='text' id='imageURL' />
            </Field>

            <Field>
                <Label>Recomendación o Guía</Label>
                <Input type='text' id='recommend' />
            </Field>

            <Button type='submit'>Compartir</Button>
        </Form>



    </main>
}
