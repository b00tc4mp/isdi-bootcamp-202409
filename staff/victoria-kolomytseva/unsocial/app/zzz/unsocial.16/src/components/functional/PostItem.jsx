import { Button } from '../library'
import Comments from './Comments'

import logic from '../../logic'

import getElapsedTime from '../../utils/getElapsedTime'//Función que calcula el tiempo transcurrido desde que el post fue creado y lo devuelve en formato legible.

import './PostItem.css'//Se importa el archivo de estilo CSS para aplicar a este componente.
import { Component } from 'react'//Se importa desde React la clase Component, que es la que extiende este componente para tener acceso a su ciclo de vida y estado.

export default class extends Component { //Se define un componente de clase que extiende Component (de React)
    constructor(props) {
        console.log('PostItem')

        super(props)

        this.state = { view: null }//Aquí, view está inicializado en null porque no hay ninguna vista activa cuando se carga el componente por primera vez (por ejemplo, la vista de comentarios).
    }

    render() {// es donde definimos lo que el componente va a mostrar en la página.
        console.log('PostItem -> render')

        const { item: { id, author, image, text, date, liked, likes }, onLiked, onDeleted } = this.props

        return <article className="PostItem" >
            <h4>{author.username}</h4>

            <img src={image} />

            <p>{text}</p>

            <time>{getElapsedTime(date)} ago</time>

            <Button onClick={() => { // Botón de Like
                logic.toggleLikePost(id)

                onLiked()//para actualizar el estado del post en el padre o en otro lugar
            }}>{`${liked ? '❤️' : '🤍'} ${likes.length} likes`}</Button>
// Botón de Eliminar (solo si es el autor)
            {author.id === logic.getUserId() && <Button onClick={() => {
                if (confirm('Delete post?')) {
                    logic.deletePost(id)

                    onDeleted()
                }
            }}>🗑️</Button>}

// Botón de Comentarios
            <Button onClick={() => {
                this.setState({ view: this.state.view ? null : 'comments' })
            }}>💬</Button>

            {this.state.view === 'comments' && <Comments />}// vuelve a poner view a null para ocultarlos
        </article>

    }

}


