import { Component } from 'react'
import { Button } from '../library'

import Comments from './Comments'

import logic from '../../logic'

import getElapsedTime from '../../utils/getElapsedtime'
import './PostItem.css'

export default class extends Component {
    constructor(props) {
        console.log('PostItem')

        super(props)

        this.state = { view: null }
    }


    render() {
        console.log('PostItem -> render')

        const { item: { id, author, image, text, date, liked, likes }, onLikeClicked, onDelete } = this.props


        return <article className="PostItem">
            <h4>{author.username}</h4>

            <img src={image} />

            <p>{text}</p>

            <time>{getElapsedTime(date)}</time>

            <Button onClick={() => {
                logic.toggleLikePost(id)

                onLikeClicked()
            }}>{`${liked ? '❤️' : '🤍'} ${likes.length} likes`}</Button>

            {author.id === logic.getUserId() && <Button onClick={() => {
                if (confirm('Delete post')) {
                    logic.deletePost(id)

                    onDelete()
                }
            }}>🚮</Button>}

            <Button onClick={() => {
                this.setState({ view: this.state.view ? null : 'comments' })
            }}>🪧</Button>

            {this.state.view === 'comments' && <Comments />}
        </article>
    }

}
