import { Component } from 'react'

import './PostList.css'

import logic from '../logic'

import { PostItem } from '../components/functional'

export default class extends Component {
    constructor(props) {
        console.log('PostList -> contructor')

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

    handleCommented = () => {
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
        console.log('PostList -> render')
        return <div className="PostList">

            {this.state.posts.map(post => <PostItem

                key={post.id}
                post={post}
                onLiked={this.handleLiked}
                onDeleted={this.handleDeleted}
                onCommented={this.handleCommented}
                onCommentRemoved={this.handleCommentRemoved} />)}
        </div>
    }
}