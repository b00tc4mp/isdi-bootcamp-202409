import { Component } from 'react'

import PostItem from '../components/function/PostItem'
import './PostList.css'
import logic from '../logic'

export default class PostList extends Component {

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

        return <div className='PostList'>
            {this.state.posts.map(post => <PostItem
                key={post.id}

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
