import { Button } from '../library'

import logic from '../../logic'

import getElapsedTime from '../../utils/getElapsedTime'


export default function comments({ postId, comment: { id, author, text, date }, onRemoved }) {

    console.log('AddComment -> render')

    const handleRemove = () => {

        if (confirm('Delete comment?'))

            try {
                logic.removeComments(postId, id, error => {
                    if (error) {
                        alert(error.message)

                        console.log(error)
                    }

                    onRemoved()

                })

            } catch (error) {

                alert(error.message)

                console.log(error)
            }
    }


    return <section>

        <li>
            <h4>{author.username}</h4>

            <p>{text}</p>

            <time>{getElapsedTime(date)}</time>

            {logic.getUserId() === author.id && <Button onClick={handleRemove}>🗑️</Button>}
        </li>
    </section >

}