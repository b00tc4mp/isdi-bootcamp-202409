import { Component } from 'react'

import './PostList.css'

import logic from '../../logic'

import PostItem from './PostItem'

export default class extends Component {
    constructor(props) {
        super(props)

        console.log('PostList -> contructor')
        let posts

        try {
            posts = logic.getPosts()
        } catch (error) {
            alert(error.message)

            console.error(error)
        }

        this.state = { posts }
    }
    render() {
        console.log('PostList -> render')
        return <div className="PostList">

            {this.state.posts.map(post => <PostItem post={post} onLiked={() => {
                try {
                    const posts = logic.getPosts()

                    this.setState({ posts })
                } catch (error) {
                    alert(error.message)

                    console.error(error)
                }

            }}
                onDeleted={() => {
                    try {
                        const posts = logic.getPosts()

                        this.setState({ posts })
                    } catch (error) {
                        alert(error.message)

                        console.error(error)
                    }
                }}

                onCommented={() => {
                    try {
                        const posts = logic.getPosts()

                        this.setState({ posts })
                    } catch (error) {
                        alert(error.message)

                        console.error(error)
                    }
                }}

                onCommentRemoved={() => {
                    try {
                        const posts = logic.getPosts()

                        this.setState({ posts })
                    } catch (error) {
                        alert(error.message)

                        console.error(error)
                    }
                }} />)}
        </div>
    }
}