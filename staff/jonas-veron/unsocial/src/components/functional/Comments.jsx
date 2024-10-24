import logic from '../../logic'
import getElapsedTime from '../../utils/getElapsedTime'

import { Component } from 'react'

export default  class extends Component{
    constructor(props){
        console.log('Comments -> constructor')
        super(props)

        this.state = { 
            comments: logic.getComments(this.props.postId)     
        }
    }
    
    handleCreateComment = (event) => {
        event.preventDefault()

        const form = event.target
        const text = form.elements.text.value

        try {
            logic.createComment(logic.getUserId(), this.props.postId, text)

            this.setState({ comments: logic.getComments(this.props.postId) })
            form.reset()
        } catch (error) {   
            console.error(error)
        }
    }

    render() {

        const { comments } = this.state

    return (
    <section>
    <ul>
        {comments.map(comment => (
            <li>
                <h4>{logic.getUserName(comment.author)}</h4>
                <p>{comment.text}</p>
                <time>{getElapsedTime()} ago</time>
            </li>
        ))}
 

        <form onSubmit={this.handleCreateComment}>
            <label htmlFor="text">New comment</label>
            <textarea id="text" required></textarea>

            <button type="submit">Send</button>
        </form>
    </ul>
</section>
    )
}
}
