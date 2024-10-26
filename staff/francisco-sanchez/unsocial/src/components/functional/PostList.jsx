import { Component } from "react";

import PostItem from "./PostItem";

import getPosts from "../../logic/getPosts";

//export default class extends Component {
export default class PostList extends Component {
    constructor(props) {
        console.log('PostList -> render')

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
                item={post}

                onLiked={this.handleLiked}

                onDeleted={this.handleDeleted}

                onCommentAdded={this.handleCommentAdded}

                onCommentRemoved={this.handleCommentRemoved}

            // onLikeClicked={() => {              //Esta función es la que repinta
            //     try {
            //         const posts = getPosts()

            //         this.setState({ posts })
            //     } catch (error) {
            //         alert(error.message)

            //         console.error(error)
            //     }
            // }}

            // onDeleted={() => {              //Esta función es la que repinta
            //     try {
            //         const posts = getPosts()
            //         this.setState({ posts })
            //     } catch {
            //         alert(error.message)
            //         console.error(error)
            //     }
            // }}

            />)}
        </div>
    }
}