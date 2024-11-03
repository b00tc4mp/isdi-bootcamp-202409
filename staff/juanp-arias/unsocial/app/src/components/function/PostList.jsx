import { Component } from 'react'

import PostItem from './PostItem'
import './PostList.css'
import getPosts from '../../logic/getPosts'

export default class extends Component {
    constructor(props) {

        super(props)

        let posts

        try {
            posts = getPosts()
        } catch (error) {
            alert(error.message)

            console.error(error)
        }

        this.state = { posts }
    }

    handleLiked = () => {
        try {
            const posts = getPosts()

            this.setState({ posts })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    handleDeleted = () => {
        try {
            const posts = getPosts()

            this.setState({ posts })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    handleCommentAdded = () => {
        try {
            const posts = getPosts()

            this.setState({ posts })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    handleCommentRemoved = () => {
        try {
            const posts = getPosts()

            this.setState({ posts })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    render() {

        return <div>
            {this.state.posts.map(post => <PostItem
                post={post}

                onLiked={this.handleLiked}

                onDeleted={this.handleDeleted}

                onCommentAdded={this.handleCommentAdded}

                onCommentRemoved={this.handleCommentRemoved}
            />)}
        </div>
    }
}
//Estas funciones lo que hacen es repintar, la de delete lo que hace es traer de nuevo los posts al home.
