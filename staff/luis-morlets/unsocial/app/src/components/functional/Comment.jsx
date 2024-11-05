import { Button } from '../library'

import logic from '../../logic'

import getElapsedTime from '../../utils/getElapsedTime'

export default ({ postId, comment: { id, author, text, date }, onRemoved }) => {

    console.log('Comment -> render')

    const handleRemove = () => {
        const confirmRemove = window.confirm('Do you want to delete this comment?')
        try {
            if (confirmRemove) {
                logic.removeComment(postId, id, error => {
                    if (error) {
                        alert(error.message)

                        console.error(error)
                    }
                    onRemoved()
                })
            }
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    return <li>
        <h4>{author.username}</h4>

        <p>{text}</p>

        <time>{getElapsedTime(date)}</time>

        {logic.getUserId() === author.id && <Button onClick={handleRemove} >❌</Button>}
    </li>
}