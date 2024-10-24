import { Component } from 'react'

import logic from '../../logic'
import Comments from './Comments'

import Button from '../library/Button'

import getElapsedTime from '../../utils/getElapsedTime'

import './PostItem.css'


export default class extends Component {

    constructor(props) {

        super(props)

        this.state = { view: null }
    }

    render() {

        const { item: { id, author, image, text, date, liked, likes }, onLiked, onDeleted } = this.props

        return <article className="PostItem">

            {author.id === logic.getUserId() &&
                <Button type="button"
                    onClick={() => {
                        if (confirm('Delete post?')) {
                            logic.deletePost(id)

                            onDeleted()
                        }
                    }}>Delete Post</Button>}

            <p>Author:{author.username}</p>
            <img src={image} className='img' />
            <br />
            <button
                onClick={() => {
                    logic.toggleLikePost(id)

                    onLiked()
                }}>{`${liked ? '❤️' : '🤍'} ${likes.length}`}</button>
            <button onClick={() => {
                this.setState({ view: this.state.view ? null : 'comments' })

            }}>💬</button>
            <label style={{ opacity: '60%', fontSize: '13px', marginTop: '2%' }}>View comments...</label>

            <h4 style={{ margin: '2%', marginLeft: '40px', fontSize: 'small' }}>{text}</h4>
            <time style={{ fontSize: 'xx-small', marginRight: '10px', marginTop: '2.5%' }}>{getElapsedTime(date)}</time>

            {this.state.view === 'comments' && <Comments postId={id} />}

        </article>
    }

}
