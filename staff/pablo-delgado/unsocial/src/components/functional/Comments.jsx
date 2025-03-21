import { Component } from 'react'

import Comment from './Comment'
import AddComment from './AddComment'

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

    onAdded = () => {
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
        console.log('Comments -> render')

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

            <AddComment
                postId={this.props.postId}
                onAdded={this.onAdded}
            />
        </section>
    }
}