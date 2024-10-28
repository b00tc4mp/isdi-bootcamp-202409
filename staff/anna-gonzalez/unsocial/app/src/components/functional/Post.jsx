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

    handleSavedClick = () => {
        try {
            logic.toggleSavePost(this.props.post.id)

            this.props.onSaved()
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
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
            logic.deletePost(this.props.post.id)

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
                    saved,
                    liked,
                    saves,
                    likes,
                    comments
                },
                onSaved,
                onCommentAdded,
                onCommentRemoved
            }
        } = this

        return <article className="Post">
            <div className="above-photo-content">
                <h4>{author.username}</h4>

                <Button className="save-post-button"
                    onClick={this.handleSavedClick}>{`📌 ${saves.length}`}</Button>
            </div>

            <img src={image} />

            <p>{text}</p>

            <time>{getElapsedTime(date)} ago</time>

            {this.state.view === 'comments' && <Comments
                postId={id}
                onAdded={onCommentAdded}
                onRemoved={onCommentRemoved}
            />}

            <div className="post-buttons">
                <Button className="no-style-button"
                    onClick={this.handleLikeClick}>{`${liked ? '❤️' : '🤍'} ${likes.length}`}</Button>

                {author.id === logic.getUserId() && <Button className="no-style-button"
                    onClick={this.handleDeleteClick}>❌</Button>}

                <Button className="no-style-button"
                    onClick={this.handleCommentsClick}>💬 {comments}</Button>
            </div>
        </article >
    }
}