import { Component } from "react"

import { Button, Paragraph } from "../library"

import logic from "../../logic"

import getElapsedTime from '../../utils/getElapsedTime'
import Comments from "./Comments"

import './PostItem.css'

export default class extends Component {
    constructor(props) {
        console.log('PostItem -> contructor')

        super(props)

        this.state = { view: null }
    }

    handleLikeClick = () => {
        try {
            logic.likesInteraction(this.props.post.id)

            this.props.onLiked()
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    handleDeleteCLick = () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this post?')

        if (confirmDelete) {
            logic.deletePost(this.props.post.id)
            this.props.onDeleted()
        }
    }

    handleCommentsClick = () => {
        this.setState({ view: this.state.view ? null : 'comments' })
    }

    render() {
        console.log('PostItem -> render')

        const { post: { id, author, image, text, date, liked, likedBy, comments }, onCommented, onCommentRemoved } = this.props

        return <article className="PostItem">
            <div className="username">
                <span>👤</span>
                <h4>{author.username}</h4>
            </div>


            <figure><img src={image} /></figure>

            <div className="container">
                <div className="likes">
                    <Button type="button" className="likes" onClick={this.handleLikeClick}>{`${liked ? '❤️' : '🤍'}`}</Button>
                    <span>{`${likedBy.length} likes`}</span>

                    <Button className="" onClick={this.handleCommentsClick}>💬 {comments}</Button>

                    {this.state.view === 'comments' && <Comments
                        postId={id}
                        onAdded={onCommented}
                        onRemoved={onCommentRemoved}
                    />}
                </div>

                <div>
                    {author.id === logic.getUserId() &&
                        <Button type="button" className="delete"
                            onClick={this.handleDeleteCLick}>❌</Button>}
                </div>
            </div>

            <Paragraph className="post-item">{text}</Paragraph>

            <time>{getElapsedTime(date)} ago</time>
        </article>
    }
}