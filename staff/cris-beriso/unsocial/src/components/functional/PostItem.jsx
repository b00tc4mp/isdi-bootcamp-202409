import { Button } from '../library'
import { Component } from 'react'
import Comments from './Comments'

import logic from '../../logic'

import getElapsedTime from '../../utils/getElapsedTime'

import './PostItem.css'

export default class extends Component {

  constructor(props) {
    console.log('PostItem -> constructor')

    super(props)

    this.state = { view: null }
  }

  render() {
    console.log('PostItem -> render')

    const { item: { id, author, image, text, date, liked, likes }, onLiked, onDeleted } = this.props

    return <article className="PostItem">
      <h4>{author.username}</h4>

      <img src={image} />

      <div>
        <p>{text}</p>

        <time>{getElapsedTime(date)} ago</time>
      </div>

      <Button onClick={() => {
        logic.toggleLikePost(id)

        onLiked()
      }}>{`${liked ? '❤️' : '🤍'} ${likes.length} likes`}</Button>

      {author.id === logic.getUserId() && <Button onClick={() => {
        if (confirm('Delete post?')) {
          logic.deletePost(id)

          onDeleted()
        }
      }}>🚮</Button>}

      <button onClick={() => {
        this.setState({ view: this.state.view ? null : 'comments' })
      }}>💬</button>

      {this.state.view === 'comments' && <Comments postId={id} />}
    </article>
  }

}