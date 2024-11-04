import { Component } from 'react'

import logic from '../../logic'

import Post from './Post'

import './Posts.css'

export default class extends Component {
    constructor(props) {
        super(props)

        this.state = { posts: [] }
    }

    componentDidMount() {
        try {
            logic.getPosts((error, posts) => {
                if (error) {
                    alert(error.message)

                    console.error(error)

                    return
                }

                this.setState({ posts })
            })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    handleLiked = () => {
        try {
            logic.getPosts((error, posts) => {
                if (error) {
                    alert(error.message)

                    console.error(error)

                    return
                }

                this.setState({ posts })
            })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    handleDeleted = () => {
        try {
            logic.getPosts((error, posts) => {
                if (error) {
                    alert(error.message)

                    console.error(error)

                    return
                }

                this.setState({ posts })
            })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    handleCommentAdded = () => {
        try {
            logic.getPosts((error, posts) => {
                if (error) {
                    alert(error.message)

                    console.error(error)

                    return
                }

                this.setState({ posts })
            })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    handleCommentRemoved = () => {
        try {
            logic.getPosts((error, posts) => {
                if (error) {
                    alert(error.message)

                    console.error(error)

                    return
                }

                this.setState({ posts })
            })
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