import { Component } from 'react'

import PostItem from './PostItem'
import './PostList.css'
import getPosts from '../../logic/getPosts'

class PostList extends Component {
    constructor(props) {

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
        return <div className='PostList'>
            <h2>POSTS</h2>

            {this.state.posts.map(post => <PostItem item={post} onLikeClicked={() => {
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