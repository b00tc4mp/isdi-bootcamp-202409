import './PostItem.css'
import { Button } from '../library'
import Comments from './Comments'

import logic from '../../logic'
import dateAgo from '../../utilities/dateAgo'

import { Component } from 'react'

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = { view: null }
    }

    handleLikeClick = () => {
        try {
            logic.toggleLikePosts(this.props.post.id)

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

        const { props: { post: { id, author, image, text, date, liked, likes, comments }, onCommentAdded, onCommentRemoved } } = this
        return <article className="PostItem">
            <h4>{author.username}</h4>

            <img src={image} />

            <p>{text}</p>

            <div className='PostButtons'>
                <Button onClick={this.handleLikeClick}>{`${liked ? '❤️' : '🤍'} ${likes.length} likes`}</Button>

                <Button className="ButtonPost" onClick={this.handleCommentsClick}>🗨️{comments}</Button>

                {author.id === logic.getUserId() && <Button onClick={this.handleDeleteClick}>🗑️</Button>}
            </div>
            {this.state.view === 'comments' && <Comments
                postId={id}
                onAdded={onCommentAdded}
                onRemoved={onCommentRemoved}
            />}
            <time>{dateAgo(date)} ago...</time>
        </article>
    }
}

