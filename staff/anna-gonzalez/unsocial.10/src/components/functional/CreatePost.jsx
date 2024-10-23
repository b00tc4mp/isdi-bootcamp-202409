import createPost from '../../logic/createPost'

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
            <label htmlFor="image">Image</label>
            <input type="text" id="image" />

            <label htmlFor="text">Text</label>
            <input type="text" id="text" />

            <button type="submit">Create</button>
        </form>
    </div>
}

export default CreatePost