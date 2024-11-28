import logic from '../logic'

function CreatePost({ onCreated }) {
    console.log('CreatePost -> render')

    return <main>
        <h3>Create post</h3>

        <form onSubmit={event => {
            event.preventDefault()

            const { target: form } = event

            const {
                image: { value: image },
                text: { value: text }
            } = form

            try {
                logic.createPost(image, text)

                onCreated()
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        }}>
            <label htmlFor="image">Image</label>
            <input type="text" id="image" style={{ width: '100%', boxSizing: 'border-box' }} />

            <label htmlFor="text">Text</label>
            <input type="text" id="text" style={{ width: '100%', boxSizing: 'border-box' }} />

            <button type="submit">Create</button>
        </form>
    </main>
}

export default CreatePost