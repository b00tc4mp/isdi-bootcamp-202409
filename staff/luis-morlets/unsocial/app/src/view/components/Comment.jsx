import { Button } from '../library'

import logic from '../../logic'

import getElapsedTime from '../../utils/getElapsedTime'

import { errors } from 'com'

const { SystemError } = errors

export default function Comment({ postId, comment: { id, author, text, date }, onRemoved }) {

    console.log('Comment -> render')

    const handleRemove = () => {
        const confirmRemove = window.confirm('Do you want to delete this comment?')
        try {
            if (confirmRemove) {
                logic.removeComment(postId, id)
                    .then(onRemoved)
                    .catch(error => {
                        if (error instanceof SystemError)
                            alert('Something went wrong, try again later.')
                        else
                            alert(error.message)

                        console.error(error)
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