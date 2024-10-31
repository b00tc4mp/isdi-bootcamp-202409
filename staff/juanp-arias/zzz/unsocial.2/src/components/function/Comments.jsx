import { Component } from 'react'

import AddComments from './AddComments'
import Comment from './Comment'

import logic from '../../logic'

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
        return <section>
            <ul>
                {this.state.comments.map(comment =>
                    <Comment
                        postId={this.props.postId}
                        comment={comment}
                        onRemoved={this.onRemoved}
                    />)
                }
            </ul>

            <AddComments
                postId={this.props.postId}
                onAdded={this.onAdded}
            />
        </section>
    }
}