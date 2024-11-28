import { useState, useEffect } from 'react'

import { Post } from './components'

import logic from '../logic'

import './Home.css'

export default function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.log('Home -> useEffect "componentDidMount"')

        try {
            logic.getPosts()
                .then(setPosts)
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }, [])

    const handleLiked = () => {
        try {
            logic.getPosts()
                .then(setPosts)
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleDeleted = () => {
        try {
            logic.getPosts()
                .then(setPosts)
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleCommentAdded = () => {
        try {
            logic.getPosts()
                .then(setPosts)
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleCommentRemoved = () => {
        try {
            logic.getPosts()
                .then(setPosts)
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    console.log('Home -> render')

    return <div className="Home">
        {posts.map(post => <Post
            key={post.id}
            post={post}
            onLiked={handleLiked}
            onDeleted={handleDeleted}
            onCommentAdded={handleCommentAdded}
            onCommentRemoved={handleCommentRemoved}
        />)}
    </div>
}