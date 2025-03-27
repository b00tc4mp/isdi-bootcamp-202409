import { Component } from 'react'
import './Comments.css'
import logic from '../../logic'
import getElapsedTime from '../../utils/getElapsedTime'

class Comments extends Component {
  constructor(props) {
    super(props)

    let comments
    try {
      comments = logic.getComments(props.postId)
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
    this.state = { comments }
  }

  render() {
    console.log('Render -> Comments')
    return (
      <section className="Comments">
        <ul>
          {this.state.comments.map(({ author, text, date }) => <li>
            <h4>{author.username}</h4>
            <p>{text}</p>
            <time>{getElapsedTime(date)} ago</time>
          </li>)}
          <form onSubmit={event => {
            event.preventDefault()

            const form = event.target

            const { text: { value: text } } = form

            try {
              logic.addComment(this.props.postId, text)
              form.reset()
              try {
                const comments = logic.getComments(this.props.postId)
                this.setState({ comments })
              } catch (error) {
                alert(error.message)
                console.error(error)
              }
            } catch (error) {
              alert(error.message)
              console.error(error)
            }
          }}>
            <label htmlFor="text"> New Comment</label>
            <textarea name="" id="text"></textarea>
            <button type='submit'>Send</button>
          </form>
        </ul>
      </section>
    )
  }

}

export default Comments