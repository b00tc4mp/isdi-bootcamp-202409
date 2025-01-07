import logic from '../../logic'

import { getElapsedTime } from '../../util'
import useContext from '../useContext'

export default function Comments({ postId, comment: { id, author, text, date }, onRemoved }) {
    const { confirm } = useContext()

    const handleRemoveClick = () => {
        confirm('Delete comment?', accepted => {
            if (accepted) {
                try {
                    logic.removeComment(postId, id)
                        .then(onRemoved)
                        .catch(error => {
                            alert(error.message)

                            console.error(error)
                        })
                } catch (error) {
                    alert(error.message)

                    console.error(error)
                }
            }
        })
    }

    return <li>
        <h4>{author.username}</h4>

        <p>{text}</p>

        <time>{getElapsedTime(date)}</time>

        {logic.getUserId() === author.id && <button type="button" onClick={handleRemoveClick}>
            <img className="w-6 h-6" src="./assets/remove.svg" />
        </button>}
    </li>
}