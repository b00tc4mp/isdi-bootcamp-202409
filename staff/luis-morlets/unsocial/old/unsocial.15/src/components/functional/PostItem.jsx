import { Component } from "react"

import { Button, Paragraph } from "../library"

import logic from "../../logic"

import getElapsedTime from '../../utils/getElapsedTime'
import Comments from "./Comments"

import './PostItem.css'

export default class extends Component {
    constructor(props) {
        super(props)

        console.log('PostItem -> contructor')

        this.state = { view: null }
    }


    render() {
        console.log('PostItem -> render')

        const { post: { id, author, image, text, date, liked, likedBy, comments }, onLiked, onDeleted, onCommented, onCommentRemoved } = this.props

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

                        onLiked()
                    }}>{`${liked ? '❤️' : '🤍'}`}</Button>
                    <span>{`${likedBy.length} likes`}</span>

                    <Button className="" onClick={() => {
                        this.setState({ view: this.state.view ? null : 'comments' })
                    }}>💬 {comments}</Button>

                    {this.state.view === 'comments' && <Comments
                        postId={id}
                        onAdded={onCommented}
                        onRemoved={onCommentRemoved}
                    />}
                </div>

                <div>
                    {author.id === logic.getUserId() &&
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

            <time>{getElapsedTime(date)} ago</time>
        </article>
    }
}