import {Component } from 'react'

import PostItem from './PostItem'

import './PostList.css'

import logic from '../../logic'

class PostList extends Component {
constructor(props) {
        console.log('PostList -> render')

        super(props)

        let posts

        try{
            posts = logic.getPosts()
    
        }catch (error) {
            alert(error.message)

            console.error(error)
        }

        this.state = { posts }
    }

    render(){
        return <div className='Postlist'>

            <h3>Posts</h3>

            {this.state.posts.map(post => <PostItem item={post} onLikeClicked={() => {
                try {
                    const posts = logic.getPosts()

                    this.setState({ posts })
                } catch (error) {
                    alert(error.message)

                    console.error(error)
                }
            }}
                onDeleted={()=> {
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