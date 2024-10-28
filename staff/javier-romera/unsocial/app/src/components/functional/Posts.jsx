import { Component } from 'react'

import logic from '../../logic'

import Post from './Post'

import './Posts.css'

export default class extends Component {
    constructor(props) {
        super(props)

        let posts

        try {
            posts = logic.getPosts()
        } catch (error) {
            alert(error.message)
            console.error(error)
        }

        this.state = { posts }
    }

    handleLiked = () => {
        try {
            const posts = logic.getPosts()

            this.setState({ posts })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    handleDeleted = () => {
        try {
            const posts = logic.getPosts()

            this.setState({ posts })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    handleCommentAdded = () => {
        try {
            const posts = logic.getPosts()

            this.setState({ posts })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    handleCommentRemoved = () => {
        try {
            const posts = logic.getPosts()

            this.setState({ posts })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    render() {
        return <div className="Posts">
            {this.state.posts.map(post => <Post
                post={post}

                onLiked={this.handleLiked}

                onDeleted={this.handleDeleted}

                onCommentAdded={this.handleCommentAdded}

                onCommentRemoved={this.handleCommentRemoved}
            />)}
        </div>
    }
}