import Button from '../library/Button.jsx'

import logic from '../../logic/index.js'

import getElapsedTime from '../../util/getElapsedTime.js'

export default function Comment({ recommendId, comment: { id, author, text, date, comment }, onRemoved }) {
    console.log('Comment -> render')

    const handleRemove = () => {
        if (confirm('¿Borrar recomendación?')) //TODO dynamic inner text based on category of recommend
            try {
                logic.removeComment(recommendId, id)
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

    return <li>
        <h4>{author.username}</h4>

        <p>{text}</p>

        <time>{getElapsedTime(date)}</time>

        {logic.getUserId() === author.id && <Button onClick={handleRemove}>🗑️</Button>}
    </li>
}
