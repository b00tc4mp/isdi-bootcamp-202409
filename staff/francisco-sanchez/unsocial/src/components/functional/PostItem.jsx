import { Button } from '../library'
import Comments from './Comments'

import logic from '../../logic'

import getElapsedTime from '../../utils/getElapsedTime'

import './PostItem.css'
import { Component } from 'react'

export default class extends Component {
    constructor(props) {
        console.log('PostItem')

        super(props)

        this.state = { view: null }
    }

    handleLikeClick = () => {
        try {
            logic.toggleLikePost(this.props.item.id)

            this.props.onLiked()

        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    handleDeleteClick = () => {
        try {
            if (confirm('Delete post?')) {
                logic.deletePost(this.props.item.id)

                this.props.onDeleted()
            }

        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    handleCommentsClick = () => {
        this.setState({ view: this.state.view ? null : 'comments' })
    }

    render() {
        console.log('Post -> Render')
        const {
            props: {
                item: {
                    id,
                    author,
                    image,
                    text,
                    date,
                    liked,
                    likes,
                    comments
                },
                onCommentAdded,
                onCommentRemoved
            }
        } = this

        return <article className="PostItem">
            <div className="publishedBy">
                Published by <span className="author">{author.username}</span>: <time>{getElapsedTime(date)} ago.</time>
            </div>

            <img src={image} className="postFrame" />
            <div className="postCommentAndLikes">
                {/* Botón para dar me gusta a los posts */}
                <p className="postText">{text}</p>

                {/* Botón Like */}
                <Button onClick={this.handleLikeClick}>{`${liked ? '💙' : '🤍'} ${likes.length}`}</Button>


                {/* Botón para Eliminar posts */}
                {author.id === logic.getUserId() && <Button
                    onClick={this.handleDeleteClick}>❌</Button>}


                {/* Botón para mostrar los comentarios */}
                <Button onClick={this.handleCommentsClick}>💬 {comments}</Button>
            </div>

            <div className="comentsTexts">
                {this.state.view === 'comments' && <Comments
                    postId={id}
                    onAdded={onCommentAdded}
                    onRemoved={onCommentRemoved}
                />}
            </div>
        </article>
    }
}