import logic from '../logic'

import './Createpost.css'

import { Input, Button, Form, Field, Label } from '../components/library'

//export default (props) => {
export default ({ onCreated }) => {
    console.log('Entramos en createPost -> Render')

    const handleSubmit = event => {
        event.preventDefault()

        //Extraemos el form de event
        const { target: form } = event

        //Y en este punto extraemos los valores de los campos del form
        const {
            image: { value: image },
            text: { value: text }
        } = form

        //Ahora tratamos de crear el post
        try {

            logic.createPost(image, text, error => {
                if (error) {
                    alert(error.message)
                    console.error(error)
                    return
                }

                onCreated()
            })
            //createPost(loggedInUser.id, image, text)
            //logic.createPost(image, text)
            //props.onCreated()
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    return <article className="CreatePost Login flex items-center justify-center min-h-screen">

        <div className="container  bg-blue-900 p-8 rounded-md">
            <h3 className="text-3xl">Create new post</h3>

            <Form onSubmit={handleSubmit}>
                <Field>
                    <Label htmlFor="image">Image</Label>
                    <Input type="text" id="image" />
                </Field>
                <Field>
                    <Label htmlFor="text">Text</Label>
                    <Input type="text" id="text" />
                </Field>
                <Button type="submit"> Create</Button>
            </Form>
        </div>
    </article>
}

