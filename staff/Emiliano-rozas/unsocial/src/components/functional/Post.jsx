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
        const confirmDelete = window.confirm("Are you sure you want to delete this post?")

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

        const {
            props: {
                post: {
                    id,
                    author,
                    image,
                    text,
                    date,
                    liked,
                    likedby,
                    comments
                },
                onCommentAdded,
                onCommentRemoved
            }
        } = this


        return < article className='Post' >

            <h4>{author.username}</h4>

            <img src={image} />

            <p>{text}</p>

            <time>{getElapsedTime(date)} ago </time>

            <div className='contenedorBotones'>

                <Button onClick={this.handleLikeClick}>{`${liked ? '❤️' : '🤍'}`}{`${likedby.length} `}</Button>

                {author.id === logic.getUserId() && <Button type="button" onClick={this.handleDeleteClick}>🗑️</Button>}

                <Button onClick={this.handleCommentsClick}>💬 {comments} comments</Button>

            </div>

            {this.state.view === 'comments' && <Comments
                postId={id}
                onAdded={onCommentAdded}
                onRemoved={onCommentRemoved}
            />}

        </article >
    }
}




