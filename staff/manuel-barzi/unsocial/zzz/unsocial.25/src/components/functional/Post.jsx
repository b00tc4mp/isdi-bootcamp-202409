import { Button } from '../library'
import Comments from './Comments'

import logic from '../../logic'

import getElapsedTime from '../../utils/getElapsedTime'

import './Post.css'
import { Component } from 'react'

export default class extends Component {
    constructor(props) {
        console.log('Post')

        super(props)

        this.state = { view: null }
    }

    render() {
        console.log('Post -> render')

        const { post: { id, author, image, text, date, liked, likes, comments }, onLiked, onDeleted, onCommentAdded, onCommentRemoved } = this.props

        return <article className="Post" >
            <h4>{author.username}</h4>

            <img src={image} />

            <p>{text}</p>

            <time>{getElapsedTime(date)} ago</time>

            <Button onClick={() => {
                logic.toggleLikePost(id)

                onLiked()
            }}>{`${liked ? '❤️' : '🤍'} ${likes.length} likes`}</Button>

            {author.id === logic.getUserId() && <Button onClick={() => {
                if (confirm('Delete post?')) {
                    logic.deletePost(id)

                    onDeleted()
                }
            }}>🗑️</Button>}

            <Button onClick={() => {
                this.setState({ view: this.state.view ? null : 'comments' })
            }}>💬 {comments} comments</Button>

            {this.state.view === 'comments' && <Comments
                postId={id}
                onAdded={onCommentAdded}
                onRemoved={onCommentRemoved}
            />}
        </article >
    }
}