import { Component } from "react";

//aquest import el canviaré quan tregui la home i la modifiqui per postList (o Posts)
import PostItem from "./Post";

//import getPosts from "../../logic/getPosts";

import logic from "../../logic";



//export default class extends Component {
export default class PostList extends Component {
    constructor(props) {
        console.log('PostList -> Constructor')

        super(props)

        //let posts
        this.state = { posts: [] } //Tinc dubtes si això em pot donar problemes
    }

    componentDidMount() {
        console.log('Posts / PostList -> componentDidMount')

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
            alert(error.message);
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
            alert.error(error)
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
        } catch {
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
        } catch {
            alert.error(error)
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
                post={post}

                onLiked={this.handleLiked}

                onDeleted={this.handleDeleted}

                onCommentAdded={this.handleCommentAdded}

                onCommentRemoved={this.handleCommentRemoved}

            />)}
        </div>
    }
}