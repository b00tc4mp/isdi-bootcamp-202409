import { Component } from 'react'

import Post from './Post'

import getPosts from '../../logic/getPosts'

export default class extends Component {
    constructor(props) {
        console.log('PostList -> render')

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

    handleSaved = () => {
        try {
            const posts = getPosts()

            this.setState({ posts })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
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
        console.log('Posts -> render')

        return <>
            {this.state.posts.map(post => <Post
                post={post}

                onSaved={this.handleSaved}

                onLiked={this.handleLiked}

                onDeleted={this.handleDeleted}

                onCommentAdded={this.handleCommentAdded}

                onCommentRemoved={this.handleCommentRemoved}
            />)}
        </>
    }
}