import './CreatePost.css'

import createPost from '../../logic/cratePost'

import Label from '../library/Label'
import Input from '../library/Input'
import Form from '../library/Form'
import Field from '../library/Field'
import Button from '../library/Button'

function CreatePost(props) {
    console.log('CreatePost -> render')

    return <div className='CreatePost'>
        <h3>Create Post</h3>

        <Form onSubmit={event => {
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
        </Form>
    </div>
}

export default CreatePost