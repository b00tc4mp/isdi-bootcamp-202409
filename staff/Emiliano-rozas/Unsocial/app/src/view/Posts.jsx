import { Component } from 'react'

import { Post } from '../components/functional'

import logic from '../logic'

import './Posts.css'

export default class extends Component {
    constructor(props) {
        console.log("Posts -> render")

        super(props)

        this.state = { posts: [] }

    }


    componentDidMount() {
        console.log('Posts -> componentDidMount')

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

        console.log('Posts -> render')

        return <section className='PostList'>
            <h3> Posts</h3>
            {this.state.posts.map(post => <Post
                key={post.id}

                post={post}

                onLiked={this.handleLiked}

                onDeleted={this.handleDeleted}

                onCommentAdded={this.handleCommentAdded}

                onCommentRemoved={this.handleCommentRemoved}
            />)}

        </section >
    }
}

