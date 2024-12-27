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

    handleLikeClick = () => {
        try {
            logic.toggleLikePost(this.props.post.id)

            this.props.onLiked()
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    handleDeleteClick = () => {
        if (confirm('Delete post?')) {
            logic.deletePost(this.props.post.Id)

            this.props.onDeleted()
        }
    }

    handleCommentsClick = () => {
        this.setState({ view: this.state.view ? null : 'comments' })
    }

    render() {
        console.log('Post -> render')

        const {
            props: {
                post: {
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

        return <article className="Post" >
            <h4>{author.username}</h4>

            <img src={image} />

            <p>{text}</p>

            <time>{getElapsedTime(date)} ago</time>

            <Button onClick={this.handleLikeClick}>{`${liked ? '❤️' : '🤍'} ${likes.length} likes`}</Button>

            {author.id === logic.getUserId() && <Button onClick={this.handleDeleteClick}>🗑️</Button>}

            <Button onClick={this.handleCommentsClick}>💬 {comments} comments</Button>

            {this.state.view === 'comments' && <Comments
                postId={id}
                onAdded={onCommentAdded}
                onRemoved={onCommentRemoved}
            />}
        </article>
    }
}