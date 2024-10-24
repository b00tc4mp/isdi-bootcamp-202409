import { Component } from "react";

import PostItem from "./PostItem";

import getPosts from "../../logic/getPosts";

export default class extends Component {
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


    render() {
        return <div>
            {/* <h3>Posts</h3> */}
            {this.state.posts.map(post => <PostItem item={post}

                onLikeClicked={() => {              //Esta función es la que repinta
                    try {
                        const posts = getPosts()

                        this.setState({ posts })
                    } catch (error) {
                        alert(error.message)

                        console.error(error)
                    }
                }}

                onDeleted={() => {              //Esta función es la que repinta
                    try {
                        const posts = getPosts()
                        this.setState({ posts })
                    } catch {
                        alert(error.message)
                        console.error(error)
                    }
                }}

            />)}
        </div>
    }
}