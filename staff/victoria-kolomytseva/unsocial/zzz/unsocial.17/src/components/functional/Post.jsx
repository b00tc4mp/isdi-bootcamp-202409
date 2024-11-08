import { Button } from '../library'
import Comments from './Comments'

import logic from '../../logic'

import getElapsedTime from '../../utils/getElapsedTime'//Función que calcula el tiempo transcurrido desde que el post fue creado y lo devuelve en formato legible.

import './Post.css'//Se importa el archivo de estilo CSS para aplicar a este componente.
import { Component } from 'react'//Se importa desde React la clase Component, que es la que extiende este componente para tener acceso a su ciclo de vida y estado.

export default class extends Component { //Se define un componente de clase que extiende Component (de React)
    constructor(props) {
        console.log('Post')

        super(props)

        this.state = { view: null }//Aquí, view está inicializado en null porque no hay ninguna vista activa cuando se carga el componente por primera vez (por ejemplo, la vista de comentarios).
    }



    handleLikeClick = () => {
        try {
            logic.toggleLikePost(this.props.post.id)

            this.props.onLiked()
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    handleDeleteClick = () => {
        if (confirm('Delete post?')) {
            logic.deletePost(this.props.post.id)

            this.props.onDeleted()
        }
    }

    handleCommentsClick = () => {
        this.setState({ view: this.state.view ? null : 'comments' })
    }



    render() {// es donde definimos lo que el componente va a mostrar en la página.
        console.log('Post -> render')

        const {
            props: {
                post: {
                    id,
                    author,
                    image,
                    text,
                    date,
                    liked,
                    likes,
                    comments
                },
                onCommentAdded,
                onCommentRemoved
            }
        } = this

        return <article className="Post" >
            <h4>{author.username}</h4>

            <img src={image} />

            <p>{text}</p>

            <time>{getElapsedTime(date)} ago</time>

            <Button onClick={this.handleLikeClick}>{`${liked ? '❤️' : '🤍'} ${likes.length} likes`}</Button>

            {author.id === logic.getUserId() && <Button onClick={this.handleDeleteClick}>🗑️</Button>}

            <Button onClick={this.handleCommentsClick}>💬 {comments} comments</Button>

            {this.state.view === 'comments' && <Comments
                postId={id}
                onAdded={onCommentAdded}
                onRemoved={onCommentRemoved}
            />}
        </article >
    }
}



