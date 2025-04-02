
import { Component } from 'react'

import Comment from './Comment'//Componente que representa cada comentario individual
import AddComment from './AddComment' //permite agregar un nuevo comentario.

import logic from '../../logic'

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

                    return
                }

                this.setState({ comments })
            })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    onAdded = () => { //Método que se ejecuta cuando se agrega un nuevo comentario
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

    onRemoved = () => {//Método que se ejecuta cuando se elimina un comentario
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


    render() {//Define cómo se verá el componente en la pantalla
        console.log('Comments -> render')

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

            <AddComment
                postId={this.props.postId}
                onAdded={this.onAdded}
            />
        </section>

    }
}