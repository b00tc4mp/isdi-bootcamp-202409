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

    render() {

        const { item: { id, author, image, text, date, liked, likes }, onLikeClicked, onDeleted } = this.props

        return <article className="PostItem">
            <div className="publishedBy">
                Published by <span className="author">{author.username}</span>: <time>{getElapsedTime(date)} ago.</time>
            </div>

            <img src={image} className="postFrame" />
            <div className="postCommentAndLikes">

                {/* Botón para dar me gusta a los posts */}
                <p className="postText">{text}</p>
                <Button onClick={() => {
                    logic.toggleLikePost(id)

                    onLikeClicked()
                }}>{`${liked ? '💙' : '🤍'} ${likes.length} likes`}</Button>

                {/* Botón para Eliminar posts */}
                {author.id === logic.getUserId() && <Button
                    onClick={() => {
                        if (confirm('Delete post?')) {
                            logic.deletePost(id)

                            onDeleted()
                        }
                    }}>❌ Delete</Button>}


                {/* Botón para mostrar los comentarios */}
                <Button onClick={() => {
                    this.setState({ view: this.state.view ? null : 'comments' })
                }}>💬 Comment</Button>

            </div>
            <div className="comentsTexts">
                {this.state.view === 'comments' && <Comments />}
            </div>

        </article>

    }

}

