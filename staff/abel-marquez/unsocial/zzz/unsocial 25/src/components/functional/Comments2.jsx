import { Component } from 'react'

import Comment from './Comment'

import logic from '../../logic'

export default class extends Component {
    constructor(props) {
        console.log('Comments -> constructor')

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
        console.log('Comments -> render')
        return <section>
            <ul>
                {this.state.comments.map(comment => <Comment comment={comment} />)}

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
                    <label htmlFor="text">New comment</label>
                    <textarea id="text"></textarea>

                    <button type="submit">Send</button>
                </form>
            </ul>
        </section>
    }
}