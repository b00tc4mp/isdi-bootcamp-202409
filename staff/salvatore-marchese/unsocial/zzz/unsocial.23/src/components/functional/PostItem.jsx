import { Button } from '../library'

import logic from '../../logic'

import getElapsedTime from '../../utils/getElapsedTime'

import './PostItem.css'

export default ({ item: { id, author, image, text, date, liked, likes }, onLiked, onDeleted }) => {
console.log('PostItem -> render')

    return <article className="PostItem">
        <h4>{author.username}</h4>

        <img src={image} />

        <p>{text}</p>

        <time>{getElapsedTime(date)}</time>

        <Button onClick={() => {
            logic.toggleLikePost(id)

            onLiked()
        }}>{`${liked ? '❤️‍🔥' : '🤍'} ${likes.length} likes`}</Button>

        {author.id === logic.getUserId() && <Button onClick={() => {
            if (confirm('Delete post?')) {
                logic.deletePost(id)

                onDeleted()
            }
        }}>🗑️</Button>}
    </article>
}

