import createPost from "../../logic/createPost"

function CreatePost(props) {
    console.log('Entramos en createPost -> Render')

    return <div>
        <h3>Create new post</h3>

        <form onSubmit={event => {
            event.preventDefault()

            //Extraemos el form de event
            const { target: form } = event

            //Y en este punto extraemos los valores de los campos del form
            const {
                image: { value: image },
                text: { value: text }
            } = form

            //Ahora tratamos de crear el post
            try {
                //createPost(loggedInUser.id, image, text)
                createPost(sessionStorage.loggedInUserId, image, text)
                props.onCreated()
            } catch (error) {
                alert(error.message)
                console.error(error)
            }
        }}>
            <label htmlFor="image">Image</label>
            <input type="text" id="image" style={{ width: '100%', boxSizing: 'border-box' }} />

            <label htmlFor="text">Text</label>
            <input type="text" id="text" style={{ width: '100%', boxSizing: 'border-box' }} />

            <button type="submit"> Create</button>
        </form>
    </div>

}

export default CreatePost