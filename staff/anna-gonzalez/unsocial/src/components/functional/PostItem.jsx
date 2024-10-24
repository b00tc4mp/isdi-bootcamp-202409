import { Button } from '../library'
import Comments from './Comments'

import logic from '../../logic'

import getElapsedTime from '../../utils/getElapsedTime'

import './PostItem.css'
import { Component } from 'react'

export default class extends Component {
    constructor(props) {
        super(props)

        this.state = { view: null }
    }

    render() {
        const { item: { id, author, image, text, date, saved, liked, saves, likes }, onSaved, onLiked, onDeleted } = this.props

        return <article className="PostItem">
            <div className="above-photo-content">
                <h4>{author.username}</h4>
                <Button className="save-post-button" onClick={() => {
                    logic.toggleSavePost(id)

                    onSaved()
                }}>{`📌 ${saves.length}`}</Button>
            </div>

            <img src={image} />

            <p>{text}</p>

            <time>{getElapsedTime(date)} ago</time>

            {this.state.view === 'comments' && <Comments />}

            <div className="post-buttons">
                <Button className="no-style-button" onClick={() => {
                    logic.toggleLikePost(id)

                    onLiked()
                }}>{`${liked ? '❤️' : '🤍'} ${likes.length} likes`}</Button>

                {author.id === logic.getUserId() && <Button className="no-style-button" onClick={() => {
                    if (confirm('Are you sure you want to delete it?')) {
                        logic.deletePost(id)

                        onDeleted()
                    }
                }}>❌ Delete</Button>}

                <Button className="no-style-button" onClick={() => {
                    this.setState({ view: this.state.view ? null : 'comments' })
                }}>💬Comments</Button>
            </div>
        </article >
    }
}