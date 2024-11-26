import { Component } from 'react'

import logic from '../../logic'
import Comments from './Comments'

import Button from '../library/Button'

import getElapsedTime from '../../utils/getElapsedTime'

import './Post.css'
import { Field2 } from '../library'


export default class extends Component {
    constructor(props) {

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
            logic.deletePost(this.props.post.id)

            this.props.onDeleted()
        }
    }

    handleCommentsClick = () => {
        return this.setState({ view: this.state.view ? null : 'comments' })
    }


    render() {

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

        return <article className="Post">

            {author.id === logic.getUserId() &&
                <Button onClick={this.handleDeleteClick}>Delete Post</Button>}

            <Field2>
                <p>Author:{author.username}</p>
                <text>{text}</text>
            </Field2>

            <img src={image} className='img' />
            <br />
            <button onClick={this.handleLikeClick}>{`${liked ? '❤️' : '🤍'} ${likes.length}`}</button>
            <button onClick={this.handleCommentsClick}>💬 {comments} comments</button>
            <label style={{ opacity: '60%', fontSize: '13px', marginTop: '2%' }}>View comments...</label>
            <br />
            <time style={{ fontSize: 'xx-small', marginRight: '10px', marginTop: '2.5%' }}>{getElapsedTime(date)}</time>
            <p></p>

            {this.state.view === 'comments' && <Comments
                postId={id}
                onAdded={onCommentAdded}
                onRemoved={onCommentRemoved}
            />}

        </article >
    }

}
