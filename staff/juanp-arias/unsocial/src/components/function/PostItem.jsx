import './PostItem.css'
import { Button } from '../library'

import logic from '../../logic'
import dateAgo from '../../utilities/dateAgo'
import Comments from './Comments'

import { Component } from 'react'

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = { view: null }
    }

    render() {

        const { item: { id, author, image, text, date, liked, likes }, onLikeClicked, onDeleted } = this.props
        return <article className="PostItem">
            <h4>{author.username}</h4>

            <img src={image} />

            <p>{text}</p>

            <time>{dateAgo(date)}ago</time>

            <Button onClick={() => {
                logic.toggleLikePosts(id)

                onLikeClicked()
            }}>{`${liked ? '❤️' : '🤍'} ${likes.length} likes`}</Button>

            {author.id === logic.getUserId() &&
                <Button onClick={() => {
                    if (confirm('Delete post?')) {
                        logic.deletePost(id)

                        onDeleted()
                    }
                }}>Delete</Button>}

            <Button onClick={() => {
                this.setState({ view: this.state.view ? null : 'comments' })
            }}>Comment</Button>

            {this.state.view === 'comments' && <Comments />}
        </article>
    }
}

