import { Component } from 'react'

import './PostList.css'

import logic from '../../logic'

import PostItem from './PostItem'

export default class extends Component {
    constructor(props) {
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
        return <div className="PostList">
            {this.state.posts.map(post => <PostItem key={post.id} item={post}
                onDeletedPost={() => {
                    try {
                        const posts = logic.getPosts()

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
                }} />)}
        </div>
    }
}