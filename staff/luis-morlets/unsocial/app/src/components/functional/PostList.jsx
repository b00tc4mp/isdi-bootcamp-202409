import { Component } from 'react'

import './PostList.css'

import logic from '../../logic'

import PostItem from './PostItem'

export default class extends Component {
    constructor(props) {
        console.log('PostList -> contructor')

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

    handleCommented = () => {
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
        console.log('PostList -> render')
        return <div className="PostList">

            {this.state.posts.map(post => <PostItem
                post={post}

                onLiked={this.handleLiked}

                onDeleted={this.handleDeleted}

                onCommented={this.handleCommented}

                onCommentRemoved={this.handleCommentRemoved} />)}
        </div>
    }
}