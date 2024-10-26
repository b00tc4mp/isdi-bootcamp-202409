import { Button } from '../library'
import Comments from './Comments'

import logic from '../../logic'

import getElapsedTime from '../../utils/getElapsedTime'

import './Post.css'
import { Component } from 'react'

export default class extends Component{
    constructor(props){
        console.log('Post')

        super(props)

        this.state = { view: null}
    }

    handleLikeClick = () => {

        try {
            logic.toggleLikePost(this.props.post.id)
    
            this.props.onLiked()
        }catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    handleCommentsClick = ()=> {
        this.setState({ view: this.state.view ? null : 'comments'})
    }

    handleDeleteClick = () => {
        if (confirm('Estas seguro de eliminar este post ?')) {
            logic.deletePost(this.props.post.id)

            this.props.onDeleted()
            }
        }

    render() {
        console.log('Post -> render')
    
        const { 
            props:{
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
    
    
        return <article className="Post">

            <div className="usernameAndDeleteButton">
            <h4 className="postUserNameTitle">{author.username}</h4>
                {author.id === logic.getUserId() && <Button className="deletePostButton" onClick={this.handleDeleteClick}>🗑️</Button>}
            </div>
            <img src={image}/>
        <div  className="postItemButtons" >

            <div>
            <Button className="likePostButton" onClick={this.handleLikeClick}>{`${liked ? '❤️' : '🤍'} ${likes.length} likes`}
            </Button>

            </div>

            <div>
            <Button className="commentPostButton" onClick={this.handleCommentsClick}>💬{comments} comments</Button>
            </div>



        </div>
            <p>{text}</p>

            <time>{getElapsedTime(date)} ago</time>


            {this.state.view === 'comments' && <Comments 
                postId={id}
                onAdded={onCommentAdded}
                onRemoved={onCommentRemoved}
            />}
            
    </article>
    }
}

