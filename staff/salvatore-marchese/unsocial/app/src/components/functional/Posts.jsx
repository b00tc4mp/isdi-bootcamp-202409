import { Component } from 'react'

import Post from './Post'

import getPosts from '../../logic/getPosts'

export default class extends Component {
    constructor(props) {
        console.log('Post -> render')
        super(props)
        this.state = { posts: [] }
    }

    componentDidMount  = () => {
        this.getData()
    }

    getData = () => {
        try {
            const posts = getPosts();
            console.log(posts)

            this.setState({ posts })
        } catch (error) {
            //alert(error.message)
            console.log(error)

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

        return <div>
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

