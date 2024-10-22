import createPost from '../../logic/createPost'

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

                props.onCreatePost()
            } catch (error) {
                alert(error.message)

                console.log(error)
            }
        }}>
            <label htmlFor="image">Image</label>
            <input type="text" id="image" required={true} style={{ width: '100%', boxSizing: 'border-box' }} />

            <label htmlFor="text">Text</label>
            <input type="text" id="text" required={true} style={{ width: '100%', boxSizing: 'border-box' }} />

            <button type="submit">Create</button>
        </form>
    </div>
}

export default CreatePost