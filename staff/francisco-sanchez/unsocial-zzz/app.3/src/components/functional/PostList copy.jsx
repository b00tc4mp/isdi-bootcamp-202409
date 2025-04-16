import { Component } from "react";

import PostItem from "./Post";

import getPosts from "../../logic/getPosts";

//export default class extends Component {
export default class PostList extends Component {
    constructor(props) {
        console.log('PostList -> Constructor')

        super(props)

        let posts

        try {
            posts = getPosts()

        } catch (error) {
            alert(error.message);
            console.error(error)
        }

        this.state = { posts }
    }

    handleLiked = () => {
        try {
            const posts = getPosts()
            this.setState({ posts })
        } catch (error) {
            alert.error(error)
            console.error(error)
        }
    }

    handleDeleted = () => {
        try {
            const posts = getPosts()
            this.setState({ posts })
        } catch {
            alert(error.message)
            console.error(error)
        }
    }

    handleCommentAdded = () => {
        try {
            const posts = getPosts()
            this.setState({ posts })
        } catch {
            alert.error(error)
            console.error(error)
        }
    }

    handleCommentRemoved = () => {
        try {

        } catch {
            alert.error(error)
            console.error(error)
        }
    }


    render() {
        console.log('Posts -> render')

        return <div>
            {/* <h3>Posts</h3> */}
            {this.state.posts.map(post => <PostItem
                post={post}  //Le he cambiado el nombre de "item = {post}" a "post = {post}"

                onLiked={this.handleLiked}

                onDeleted={this.handleDeleted}

                onCommentAdded={this.handleCommentAdded}

                onCommentRemoved={this.handleCommentRemoved}

            />)}
        </div>
    }
}