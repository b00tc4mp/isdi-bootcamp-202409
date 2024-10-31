import createPost from '../../logic/createPostLogic'

function CreatePost(props) {
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
            <label htmlFor="image">Image</label>
            <input type="text" id="image" style={{ width: '100%' }} />

            <label htmlFor="image">Text</label>
            <input type="text" id="text" style={{ width: '100%' }} />

            <button type="submit">Create</button>

        </form>
    </div>
}
export default CreatePost