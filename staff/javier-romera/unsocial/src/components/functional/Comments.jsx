import { Component } from 'react'
import { Button, Form } from '../library'
import AddComment from './AddComment'

import './Comments.css'

import logic from '../../logic'
import Comment from './Comment'

export default class extends Component {
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

    onAdded = () => {
        try {
            const comments = logic.getComments(this.props.postId)

            this.setState({ comments })

            this.props.onAdded()
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    onRemoved = () => {
        try {
            const comments = logic.getComments(this.props.postId)

            this.setState({ comments })

            this.props.onRemoved()
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    render() {
        return <section className="Comments">
            <ul>
                {this.state.comments.map(comment =>
                    <Comment
                        postId={this.props.postId}
                        comment={comment}
                        onRemoved={this.onRemoved}
                    />)}
            </ul>
            <AddComment
                postId={this.props.postId}
                onAdded={this.onAdded}
            />
        </section>
    }
}