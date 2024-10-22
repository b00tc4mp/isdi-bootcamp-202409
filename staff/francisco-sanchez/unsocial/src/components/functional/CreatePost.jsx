import createPost from "../../logic/createPost"

import Input from '../library/Input'
import Button from '../library/Button'
import Form from '../library/Form'
import Field from '../library/Field'
import Label from '../library/Label'



function CreatePost(props) {
    console.log('Entramos en createPost -> Render')

    return <div>
        <h3>Create new post</h3>

        <Form onSubmit={event => {
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
                //createPost(loggedInUser.id, image, text)
                createPost(sessionStorage.loggedInUserId, image, text)
                props.onCreated()
            } catch (error) {
                alert(error.message)
                console.error(error)
            }
        }}>
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

}

export default CreatePost