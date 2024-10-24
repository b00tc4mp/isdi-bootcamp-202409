import { Component } from 'react'
import { Button, Form } from '../library'
import './Comments.css'

import logic from '../../logic'
import CommentItem from './CommentItem'

export default class extends Component {
    constructor(props) {
        super(props)

        const { postId } = props

        let comments

        try {
            comments = logic.getComments(postId)
        } catch (error) {
            alert(error.message)
            console.error(error)
        }

        this.state = { comments }
    }

    render() {
        return <section className="Comments">
            <ul>
                {this.state.comments.map(comment => <CommentItem id={comment} />)}
            </ul>
            <Form onSubmit={event => {
                event.preventDefault()

                try {
                    logic.createComment(logic.getUserId(), event.target['text-area'].value, this.props.postId)

                    event.target['text-area'].value = ""

                    const comments = logic.getComments(this.props.postId)

                    this.setState({ comments })
                } catch (error) {
                    alert(error.message)

                    console.error(error)
                }
            }}>
                <textarea id="text-area" placeholder="Comment"></textarea>
                <Button type="submit">Comment</Button>
            </Form>
        </section>
    }
}