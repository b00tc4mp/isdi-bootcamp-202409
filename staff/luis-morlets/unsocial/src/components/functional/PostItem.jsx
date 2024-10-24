import { Button, Paragraph } from "../library"

import logic from "../../logic"

import './PostItem.css'

function PostItem({ item: { id, author, image, text, date, liked, likedBy }, onLikeClicked, onDeleted }) {

    return <article className="PostItem">
        <div className="username">
            <span>👤</span>
            <h4>{author.username}</h4>
        </div>


        <figure><img src={image} /></figure>

        <div className="container">
            <div className="likes">
                <Button type="button" className="likes" onClick={() => {
                    logic.likesInteraction(id)

                    onLikeClicked()
                }}>{`${liked ? '❤️' : '🤍'}`}</Button>
                <span>{`${likedBy.length} likes`}</span>
            </div>

            <div>
                {sessionStorage.userId === author.id &&
                    <Button type="button" className="delete" onClick={() => {
                        const confirmDelete = window.confirm('Are you sure you want to delete this post?')

                        if (confirmDelete) {
                            logic.deletePost(id)
                            onDeleted()
                        }

                    }}>❌</Button>}
            </div>
        </div>

        <Paragraph className="post-item">{text}</Paragraph>

        <time>{date}</time>
    </article>
}

export default PostItem