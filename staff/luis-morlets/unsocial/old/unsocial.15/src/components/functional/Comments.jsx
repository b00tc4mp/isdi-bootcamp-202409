import { Component } from "react"

import Comment from "./Comment"
import AddComment from "./AddComment"

import logic from "../../logic"

export default class extends Component {
    constructor(props) {
        console.log('Comments -> constructor')

        super(props)

        let comments

        //trycatch al momento de obtener los comentarios por su id
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

        return <section className="Comments">
            <ul>{/*Este map se hace sobre el nuevo como de comment que contiene la lista de comentarios*/}
                {this.state.comments.map(comment =>
                    <Comment
                        postId={this.props.postId}
                        comment={comment}
                        onRemoved={() => {
                            try {
                                const comments = logic.getComments(this.props.postId)

                                this.setState({ comments })

                                this.props.onRemoved()
                            } catch (error) {
                                alert(error.message)

                                console.error(error)
                            }
                        }}
                    />)}

            </ul>
            <AddComment
                postId={this.props.postId} onAdded={() => {
                    try {
                        const comments = logic.getComments(this.props.postId)

                        this.setState({ comments })

                        this.props.onAdded()
                    } catch (error) {
                        alert(error.message)

                        console.error(error)
                    }
                }} />
        </section>
    }
}