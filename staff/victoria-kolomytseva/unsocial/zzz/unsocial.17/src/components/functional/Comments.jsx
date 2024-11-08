//es un componente de React llamado Comments, que se encarga de mostrar y gestionar una lista de comentarios en una publicación.

import { Component } from 'react'

import Comment from './Comment'//Componente que representa cada comentario individual
import AddComment from './AddComment' //permite agregar un nuevo comentario.

import logic from '../../logic'

export default class extends Component {
    constructor(props) {
        console.log('Comments -> constructor')

        super(props)

        let comments

        try {
            comments = logic.getComments(props.postId)//Intenta obtener los comentarios usando logic.getComments(props.postId) para la publicación específica (props.postId).
        } catch (error) {
            alert(error.message)

            console.error(error)
        }

        this.state = { comments }
    }

    onAdded = () => { //Método que se ejecuta cuando se agrega un nuevo comentario
        try {
            const comments = logic.getComments(this.props.postId)

            this.setState({ comments })//Obtiene la lista actualizada de comentarios y actualiza el estado 

            this.props.onAdded()//para notificar que se ha agregado un comentario
        } catch (error) {
            alert(error.message)

            console.error(error)
        }

    }

    onRemoved = () => {//Método que se ejecuta cuando se elimina un comentario
        try {
            const comments = logic.getComments(this.props.postId)

            this.setState({ comments })

            this.props.onRemoved()//para notificar que se ha eliminado un comentario.
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    render() {//Define cómo se verá el componente en la pantalla
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