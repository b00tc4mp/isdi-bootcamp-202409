import { Component } from 'react'

import logic from '../../logic'

import PostItem from './PostItem'


class PostList extends Component {

    constructor(props) {
        console.log('PostList -> render')

        super(props)

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
        return <div id="posts">
            <h3>Posts</h3>

            {this.state.posts.map(post => <PostItem item={post}
                onDeleted={() => {

                    try {
                        const posts = logic.getPosts()
                        // logic.deletePost()

                        this.setState({ posts })
                    } catch (error) {
                        alert(error.message)

                        console.error(error)
                    }

                }}
                onLikeClicked={() => {
                    try {
                        const posts = logic.getPosts()

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

export default PostList