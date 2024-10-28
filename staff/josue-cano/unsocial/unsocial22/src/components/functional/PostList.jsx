import { Component } from 'react'

import PostItem from './PostItem'

import getPosts from '../../logic/getPosts'

class PostList extends Component {
    constructor(props) {
        console.log('PostList -> render')

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
        return <div>
            {this.state.posts.map(post => <PostItem key={post.id} item={post} onLikeClicked={() => {
                try {
                    const posts = getPosts()

                    this.setState({ posts })
                } catch (error) {
                    alert(error.message)

                    console.error(error)
                }
            }} />)}
        </div>
    }
}

export default PostList