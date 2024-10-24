import { Button } from '../library'

import logic from '../../logic'

import './PostItem.css'
import getElapsedTime from '../../utils/getElapsedTime'
import { Component } from 'react'
import Comments from './Comments'
import getComments from '../../logic/getComments'

export default class extends Component {
    constructor(props) {
        super(props)

        this.state = { view: null }
    }

    render() {
        const { item: { id, author, image, text, date, liked, likedBy }, onLikeClicked, onDeletedPost, } = this.props

        return <article className="PostItem">
            <div className="post-header">
                <h4>{author.username}</h4>

                {logic.getUserId() === author.id && <Button classname="delete-button" type="button" onClick={() => {
                    if (confirm('Are you sure you want to delete this post?')) {
                        logic.deletePost(id)

                        onDeletedPost()
                    }
                }}>❌</Button>}
            </div >

            <img src={image}></img>

            <div className="likes-div">
                <Button classname="like-button" onClick={() => {
                    logic.toggleLikePost(id)

                    onLikeClicked()
                }}>{`${liked ? '❤️' : '🤍'}`}</Button>

                <span>{likedBy.length}</span>

                <Button classname="comment-button" onClick={() => {
                    const comments = getComments(id)
                    this.setState({ view: this.state.view ? null : 'comments' })
                }}>💬</Button>
            </div>

            <p className="caption">{text}</p>

            {this.state.view === 'comments' && <Comments postId={id} />}

            {this.state.view !== 'comments' && <p onClick={() => {
                this.setState({ view: 'comments' })
            }}>View comments...</p>}

            <time>{getElapsedTime(date)} ago</time>
        </article >
    }
}