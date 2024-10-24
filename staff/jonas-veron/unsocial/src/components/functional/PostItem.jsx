import { Button } from '../library'

import logic from '../../logic'
import getElapsedTime from '../../utils/getElapsedTime'

import './PostItem.css'
import Comments from './Comments'
import { Component } from 'react'

export default class extends Component{
    constructor(props){
        console.log('PostItem')

        super(props)

        this.state = { view: null}
    }

    render() {
        console.log('PostItem -> render')
    
    const { item: { id, author, image, text, date, liked, likes }, onLiked, onDeleted } = this.props
    
    // const { userId } = sessionStorage
    
    return <article className="PostItem">
        <h4>{author.username}</h4>

        <img src={image}/>

        <p>{text}</p>

        <time>{getElapsedTime(date)} ago</time>

        <div className="deleteButton">
            {logic.getUserId() === author.id && <Button className="Button" onClick={() => {
                let confirmDelete = window.confirm('Estas seguro de eliminar este post ?')

                if(confirmDelete) {
                logic.deletePost(id)
                onDeleted()
            }
            }}>🗑️</Button>}
        </div>
        <div className="likeButton">
            <Button className="Button" onClick={() => {
            logic.toggleLikePost(id)

            onLiked()
            }}>{`${liked ? '❤️' : '🤍'} ${likes.length} likes`}
            </Button>

        </div>
        <div className="commentPostButton">
            <Button className="Button" onClick={()=> {
                this.setState({ view: this.state.view ? null : 'comments'})
            }}>💬</Button>
        </div>

            {this.state.view === 'comments' && <Comments postId={id}/>}
            


    </article>
    }
}
