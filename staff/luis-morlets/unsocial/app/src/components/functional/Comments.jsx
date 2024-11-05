import { Component } from "react"

import Comment from "./Comment"
import AddComment from "./AddComment"

import logic from "../../logic"

export default class extends Component {
    constructor(props) {
        console.log('Comments -> constructor')

        super(props)

        this.state = { comments: [] }
    }

    componentDidMount() {
        try {
            logic.getComments(this.props.postId, (error, comments) => {
                if (error) {
                    alert(error.message)

                    console.error(error)
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

        console.log('Comments -> render')

        return <section className="Comments">
            <ul>
                {this.state.comments.map(comment =>
                    <Comment
                        key={comment.id}
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