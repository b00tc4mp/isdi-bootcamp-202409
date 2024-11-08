import { Button } from '../library'
import Comments from './Comments'

import logic from '../../logic'

import getElapsedTime from '../../utils/getElapsedTime'

import { Component } from 'react'

import './Post.css'

export default class extends Component {
    constructor(props) {
        super(props)

        this.state = { view: null }
    }

    handleLikeClick = () => {
        try {
            logic.toggleLikePost(this.props.post.id, error => {
                if (error) {
                    alert(error.message)

                    console.error(error)

                    return
                }

                this.props.onLiked()
            })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    handleDeleteClick = () => {
        if (confirm('Are you sure you want to delete this post?')) {
            logic.deletePost(this.props.post.id, error => {
                if (error) {
                    alert(error.message)

                    console.error(error)

                    return
                }

                this.props.onDeleted()
            })
        }
    }

    handleCommentsClick = () => {
        this.setState({ view: this.state.view ? null : 'comments' })
    }

    handleViewCommentsShow = () => {
        this.setState({ view: 'comments' })
    }

    handleViewCommentsHide = () => {
        this.setState({ view: null })
    }

    render() {
        const { post: { id, author, image, text, date, liked, likedBy, comments }, onCommentAdded, onCommentRemoved, } = this.props

        return <article className="Post">
            <div className="post-header">
                <h4>{author.username}</h4>

                {logic.getUserId() === author.id && <Button classname="delete-button" type="button" onClick={this.handleDeleteClick}>❌</Button>}
            </div>

            <img src={image}></img>

            <div className="likes-div">
                <Button classname="like-button" onClick={this.handleLikeClick}>{`${liked ? '❤️' : '🤍'}`}</Button>

                <span>{likedBy.length}</span>

                <Button classname="comment-button" onClick={this.handleCommentsClick}>💬 </Button>
                <span>{comments}</span>
            </div>

            <p className="caption">{text}</p>

            {this.state.view === 'comments' && <Comments
                postId={id}
                onAdded={onCommentAdded}
                onRemoved={onCommentRemoved} />}

            {this.state.view === 'comments' && <p onClick={this.handleViewCommentsHide}>Hide comments</p>}

            {this.state.view !== 'comments' && <p onClick={this.handleViewCommentsShow}>View comments...</p>}

            <time>{getElapsedTime(date)} ago</time>
        </article >
    }
}