import logic from '../logic'
import './CreatePost.css'
function CreatePost({ onCreated }) {
    return <main className='CreatePost'>
        <h3>Create Post</h3>

        <form onSubmit={event => {
            event.preventDefault()

            const { target: form } = event

            const {
                image: { value: image },
                text: { value: text }
            } = form

            try {
                logic.createPostLogic(image, text)

                onCreated()
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
    </main>
}
export default CreatePost