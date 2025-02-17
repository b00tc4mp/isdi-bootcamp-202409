import { Component } from 'react'

import logic from '../../logic'

import Post from './Post'

export default class extends Component {

    constructor(props) {
        console.log('PostList -> render')

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

            console.error(message)
        }
    }

    handleDeleted = () => {
        try {
            const posts = logic.getPosts()

            this.setState({ posts })
        } catch (error) {
            alert(error.message)

            console.error(message)
        }
    }

    handleCommentAdded = () => {
        try {
            const posts = logic.getPosts()

            this.setState({ posts })
        } catch (error) {
            alert(error.message)

            console.error(message)
        }
    }

    handleCommentRemoved = () => {
        try {
            const posts = logic.getPosts()

            this.setState({ posts })

        } catch (error) {
            alert(error.message)

            console.error(message)
        }
    }



    render() {
        return <div id="posts">

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