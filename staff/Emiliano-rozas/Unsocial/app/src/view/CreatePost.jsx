import logic from '../logic'

import { Form, Label, Input, Button } from '../components/library'

import './CreatePost.css'


export default function CreatePost({ onCreated, onCancel }) {
    console.log("Creapost -> render")


    const handleSubmit = event => {
        event.preventDefault()

        const { target: form } = event

        const {
            image: { value: image },
            text: { value: text }
        } = form

        try {
            logic.createPost(image, text, error => {
                if (error) {
                    alert(error.message)

                    console.error(error)

                    return
                }

                onCreated()
            })

        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    return <main>
        <section className='CreatePost'>
            <h3>Create Post</h3>

            <Form onSubmit={handleSubmit}>
                <Label htmlFor="image">Imagen</Label>
                <Input type="text" id="image" />

                <Label htmlFor="text">Text</Label>
                <Input type="text" id="text" />
                <div className='botonesCreate'>
                    <Button type="submit">Submit</Button>

                    <Button type="button" onClick={() => {
                        onCancel()
                    }
                    }>↪</Button>
                </div>

            </Form>
        </section >
    </main>

}

