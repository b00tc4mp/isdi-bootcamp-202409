import createPost from '../../logic/CreatePost'
import Button from '../library/Button'

function CreatePost(props) {
    console.log("Creapost -> render")

    return <div>

        <h3>Create Post</h3>

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
            <label htmlFor="image">Imagen</label>
            <input type="text" id="image" />

            <label htmlFor="text">Text</label>
            <input type="text" id="text" />

            <Button type="submit">Submit</Button>

            <Button type="button" onClick={() => {
                props.onCancel()
            }
            }>↪</Button>

        </form>
    </div>
}

export default CreatePost