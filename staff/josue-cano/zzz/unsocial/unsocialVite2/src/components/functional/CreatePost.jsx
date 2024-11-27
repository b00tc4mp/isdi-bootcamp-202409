import createPost from '../logic/createPost'

function CreatePost(props) {
    console.log('CreatePost -> render')

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
                // Obtener el usuario actual desde sessionStorage
                const loggedInUser = sessionStorage.getItem("usuarioActual"); // Aquí guardamos el nombre de usuario
                const userId = sessionStorage.loggedInUserId; // Aquí guardamos el ID del usuario si está almacenado
                debugger
                if (!loggedInUser && !userId) {
                    throw new Error('Invalid user session');
                }

                // Llamar a createPost con los parámetros correctos (userId, username, image, text)
                createPost(loggedInUser || userId, loggedInUser, image, text); // Se pasa el nombre de usuario aquí

                props.onCreated();
            } catch (error) {
                alert(error.message);
                console.error(error);
            }
        }}>
            <label htmlFor="image">Image</label>
            <input type="text" id="image" style={{ width: '100%', boxSizing: 'border-box' }} />

            <label htmlFor="text">Text</label>
            <input type="text" id="text" style={{ width: '100%', boxSizing: 'border-box' }} />

            <button type="submit">Create</button>
        </form>
    </div>
}
export default CreatePost