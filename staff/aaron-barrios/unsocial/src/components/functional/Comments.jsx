import { Component } from "react"

import logic from "../../logic"
// import CommentItem from "./CommentItem"


export default class extends Component {
    constructor(props) {
        super(props)

        let comments

        const { postId } = props

        try {
            comments = logic.getComments(postId)

        } catch (error) {
            alert(error.message)

            console.error(error)
        }

        this.state = { comments }
    }

    render() {
        return <section>
            <ul>
                {/* {this.state.comments.map(comment => <CommentItem id={comment} />)} */}

                <form onSubmit={event => {
                    event.preventDefault()

                    const { target: form } = event

                    const {
                        textarea: { value: textarea }
                    } = form

                    try {
                        logic.createComment(this.props.postId, textarea)

                        event.target.reset()

                        const newComments = logic.getComments(this.props.postId)

                        this.setState({ newComments })
                    } catch (error) {

                        alert(error.message)

                        console.error(error)
                    }
                }}>
                    <label htmlFor="textarea">New comment</label>
                    <p></p>
                    <textarea id="textarea"></textarea>
                    <p></p>

                    <button type="submit">Send</button>
                </form>
            </ul>
        </section>
    }
}

