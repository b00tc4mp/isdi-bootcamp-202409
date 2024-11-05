import { Component } from 'react'

import AddComments from './AddComments'
import Comment from './Comment'

import logic from '../../logic'

export default class extends Component {
    constructor(props) {
        super(props)

        this.state = { comments: [] }
    }

    componentDidMount() {
        try {
            logic.getComments(this.props.postId, (error, comments) => {
                if (error) {
                    alert(error.message)

                    console.error(error)
                    return
                }
                this.setState({ comments })
            })
        } catch (error) {

            alert(error.message)
            console.error(error)
        }
    }

    onAdded = () => {
        try {
            logic.getComments(this.props.postId, (error, comments) => {
                if (error) {
                    alert(error.message)

                    console.error(error)
                    return
                }
                this.setState({ comments })
                this.props.onAdded()
            })
        } catch (error) {

            alert(error.message)
            console.error(error)
        }
    }

    onRemoved = () => {
        try {
            logic.getComments(this.props.postId, (error, comments) => {
                if (error) {
                    alert(error.message)

                    console.error(error)
                    return
                }
                this.setState({ comments })

                this.props.onRemoved()
            })
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
                        key={comment.id}
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