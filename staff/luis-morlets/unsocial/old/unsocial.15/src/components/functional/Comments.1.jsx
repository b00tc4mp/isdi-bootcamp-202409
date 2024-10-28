import { Component } from "react"

import { Button, Form, Field, Label } from "../library"

import Comment from "./Comment"

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
                {this.state.comments.map(comment => <Comment comment={comment} />)}

                <Form onSubmit={event => {
                    event.preventDefault()

                    const { text: { value: text } } = event.target

                    try {
                        logic.createComment(text, this.props.postId)

                        event.target.reset()

                        try {
                            const comments = logic.getComments(this.props.postId)

                            this.setState({ comments })
                        } catch (error) {
                            alert(error.message)

                            console.error(error)
                        }
                    } catch (error) {
                        alert(error.message)

                        console.log(error)
                    }
                }}>
                    <Field>
                        <Label htmlFor="text">New comment</Label>
                        <textarea id="text"></textarea>
                    </Field>

                    <Button type="submit">Send</Button>
                </Form>
            </ul>
        </section>
    }
}