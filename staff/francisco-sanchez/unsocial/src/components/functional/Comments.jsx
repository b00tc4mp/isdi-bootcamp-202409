import { Component } from "react";

import Comment from "./Comment";
import AddComment from "./addComment";

import logic from "../../logic";

//export default class extends Component {
export default class Comments extends Component {
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
            /**
             * Llama a logic.getComments con el postId actual (proveniente de this.props) 
             * para obtener los comentarios actualizados del post y 
             * almacenarlos en comments.
             */
            const comments = logic.getComments(this.props.postId)

            /**
             * Guarda los comentarios recién obtenidos en el estado (this.state.comments).
             *  Esto permite que el componente se vuelva a renderizar y muestre los 
             * nuevos comentarios.
             */
            this.setState({ comments })

            /*
            Llama a onAdded, que es una función pasada como propiedad desde un 
            componente superior. Este patrón permite que los componentes 
            padres reaccionen cuando algo cambia en el hijo (en este caso, 
            después de agregar un nuevo comentario).
            */
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