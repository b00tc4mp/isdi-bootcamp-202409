import { Button } from '../library'

import logic from '../../logic'

import './PostItem.css'

function PostItem({ item: { id, author, image, text, date, liked, likes }, onLikeClicked }) {

    return <article className="PostItem">
        <div className="publishedBy">
            Published by <span className="author">{author.username}</span> on <time>{date}</time>
        </div>

        <img src={image} className="postFrame" />
        <div className="postCommentAndLikes">
            <p className="postText">{text}</p>
            <Button onClick={() => {
                logic.toggleLikePost(id)

                onLikeClicked()
            }}>{`${liked ? '❤️' : '🤍'} ${likes.length} likes`}</Button>
        </div>


    </article>
}

export default PostItem