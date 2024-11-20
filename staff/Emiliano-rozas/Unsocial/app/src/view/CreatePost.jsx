import logic from '../logic'

import { Form, Label, Input, Button } from '../components/library'

// import './CreatePost.css'


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

    return <main className="w-full p-5 flex-1 box-border">
        <section className="align-center p-5 max-w-[400px] mx-auto mt-12 mb-12 bg-[#dcd7d7] rounded-[10px] shadow-md w-full box-border">
            <h3 className="text-center text-[18px] text-[#333]">Create Post</h3>

            <Form onSubmit={handleSubmit}>
                <Label htmlFor="image">Imagen</Label>
                <Input type="text" id="image" />

                <Label htmlFor="text">Text</Label>
                <Input type="text" id="text" />
                <div class="flex">
                    <Button type="submit">Submit</Button>

                    <Button type="button" onClick={onCancel}>↪</Button>
                </div>

            </Form>
        </section >
    </main>

}

