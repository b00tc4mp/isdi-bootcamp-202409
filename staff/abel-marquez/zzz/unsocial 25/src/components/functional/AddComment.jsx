import logic from '../../logic'

export default ({ postId, onAdded }) =>
    <form onSubmit={event => {
        event.preventDefault()

        const form = event.target

        const { text: { text } } = form

        try {
            logic.addComment(postId, text)

            form.reset()

            onAdded()
        } catch (error) {
            alert (error.message)

            console.error(error)
        }
    }}>

        <label htmlFor="text"> New Comment </label>
        <textarea id="text"></textarea>

        <button type='submit'> Send </button>

    </form>