import logic from '../../logic'

export default () => <section>
    <ul>
        <li>
            <h4>username</h4>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore autem eos quae magni. Nesciunt provident consectetur voluptas impedit voluptatum repellendus, doloribus eaque illo sit, accusantium quia excepturi rerum vitae? Porro?
            <time>2 days</time>
        </li>

        <form onSubmit={event => {
            event.preventDefault()

            const { target: form } = event

            const {
                text: { value: text}
            } = form

            try {
                logic.createComment(text)

                onCreateComment()
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        }}>
            <label htmlFor="text">New comment</label>
            <textarea id="text"></textarea>

            <button type="submit">Send</button>
        </form>
    </ul>
</section>