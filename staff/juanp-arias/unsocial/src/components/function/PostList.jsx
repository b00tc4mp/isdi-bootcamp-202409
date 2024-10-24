import { Component } from 'react'

import PostItem from './PostItem'
import './PostList.css'
import getPosts from '../../logic/getPosts'

export default class extends Component {
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

            {this.state.posts.map(post => <PostItem item={post}

                onLikeClicked={() => {
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
//Estas funciones lo que hacen es repintar, la de delete lo que hace es traer de nuevo los posts al home.
