import { Component } from 'react'

import Post from './Post'

import getPosts from '../../logic/getPosts'

export default class extends Component {
    constructor(props) {
        console.log('Post -> render')

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

    render() {
        console.log('Posts -> render')

        return <div>
            {this.state.posts.map(post => <Post
                post={post}

                onLiked={() => {
                    try {
                        const posts = getPosts()

                        this.setState({ posts })
                    } catch (error) {
                        alert(error.message)

                        console.error(error)
                    }
                }}

                onDeleted={() => {
                    try {
                        const posts = getPosts()

                        this.setState({ posts })
                    } catch (error) {
                        alert(error.message)

                        console.error(error)
                    }
                }}

                onCommentAdded={() => {
                    try {
                        const posts = getPosts()

                        this.setState({ posts })
                    } catch (error) {
                        alert(error.message)

                        console.error(error)
                    }
                }}

                onCommentRemoved={() => {
                    try {
                        const posts = getPosts()

                        this.setState({ posts })
                    } catch (error) {
                        alert(error.message)

                        console.error(error)
                    }
                }}
            />)}
        </div>
    }
}