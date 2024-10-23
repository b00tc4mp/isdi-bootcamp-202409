import createPost from '../../logic/createPost'

import Button from '../library/Button'
import Input from '../library/Input'
import Label from '../library/Label'
import Field from '../library/Field'

function CreatePost(props) {
    console.log('CreatePost -> render')

    return <div>
        <h3>Create post</h3>

        <form onSubmit={event => {
            event.preventDefault()

            const { target: form } = event

            const {
                image: { value: image },
                text: { value: text }
            } = form

            try {
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
            <Button type="submit">Create</Button>
        </form>
    </div>
}

export default CreatePost