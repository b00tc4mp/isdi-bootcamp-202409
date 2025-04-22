import { Component } from "react";

import Post from './Post';

import getPosts from "../../logic/getPosts";

export default class Posts extends Component {
    constructor(props) {
        console.log('PostList ->')

        super(props)

        let posts 

        try {
            posts = getPosts()
        } catch (error) {
            alert(error.message)

            console.log(error)
        }

        this.state = {posts}
    }

    handleLiked = () => {
        try {
            const posts = getPosts()

            this.setState({posts})
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    handleDeleted = () => {
        try {
            const posts = getPosts()

            this.setState({posts})
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    handleCommentAdded = () => {
        try {
            const posts = getPosts()

            this.setState({posts})
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    handleCommentRemoved = () => {
        try {
            const posts = getPosts()

            this.setState({posts})
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    render () {
        console.log('Posts -> render')

        return <div>
            {this.state.posts.map(post => <Post
                post = {post}

                onLiked={this.handleLiked}

                onDeleted={this.handleDeleted}

                onCommentAdded={this.handleCommentAdded}

                onCommentRemoved={this.handleCommentRemoved}                
            />)}
        </div>
    }
}

//export default Posts