
import { Button } from '../library' // Importa un botón para usarlo en el componente.

import logic from '../../logic' //se usa para borrar comentarios

import getElapsedTime from '../../utils/getElapsedTime' //Esta función calcula el tiempo transcurrido desde que se creó el comentario
//postID: La ID de la publicación a la que pertenece el comentario
export default ({ postId, comment: { id, author, text, date }, onRemoved }) => { //onRemoved: Una función que se ejecuta cuando el comentario es eliminado
    console.log('Comment -> render')

    const handleRemove = () => { //La función para borrar el comentario
        if (confirm('Delete comment?'))//pregunta al usuario si está seguro de que quiere borrar el comentario
            try {
                logic.removeComment(postId, id, error => {
                    if (error) {
                        alert(error.message)

                        console.error(error)

                        return
                    }

                    onRemoved()
                })
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
    }

    return <li>
        <h4>{author.username}</h4>

        <p>{text}</p>

        <time>{getElapsedTime(date)}</time>

        {logic.getUserId() === author.id && <Button onClick={handleRemove}>🗑️</Button>}
    </li>
}