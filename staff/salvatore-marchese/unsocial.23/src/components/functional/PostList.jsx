import { Component } from 'react'

import PostItem from './PostItem'

import getPosts from '../../logic/getPosts'



export default class extends Component {
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
            {this.state.posts.map(post => <PostItem item={post} onLiked={() => {
                try {
                    const posts = getPosts()

                    this.setState({ posts })
                } catch (error) {
                    alert(error.message)

                    console.error(error)
                }
            }} 
            onDeleted={() => {
                try {
                    const posts = getPosts()

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

