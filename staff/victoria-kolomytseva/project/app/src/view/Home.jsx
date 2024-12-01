import { useState, useEffect } from 'react'


import logic from '../logic'

export default function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.log('Home -> useEffect "componentDidMount"')

        try {
            // logic.getPosts()
            //     .then(setPosts)
            //     .catch(error => {
            //         alert(error.message)

            //         console.error(error)
            //     })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }, [])

    const handleLiked = () => {
        try {
            // logic.getPosts()
            //     .then(setPosts)
            //     .catch(error => {
            //         alert(error.message)

            //         console.error(error)
            //     })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleDeleted = () => {
        try {
            // logic.getPosts()
            //     .then(setPosts)
            //     .catch(error => {
            //         alert(error.message)

            //         console.error(error)
            //     })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleCommentAdded = () => {
        try {
            // logic.getPosts()
            //     .then(setPosts)
            //     .catch(error => {
            //         alert(error.message)

            //         console.error(error)
            //     })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleCommentRemoved = () => {
        try {
            // logic.getPosts()
            //     .then(setPosts)
            //     .catch(error => {
            //         alert(error.message)

            //         console.error(error)
            //     })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    console.log('Home -> render')

    return <div className="py-12 h-screen from-background-light to-background-dark bg-gradient-to-b">
        {/* {posts.map(post => <Post
            key={post.id}
            post={post}
            onLiked={handleLiked}
            onDeleted={handleDeleted}
            onCommentAdded={handleCommentAdded}
            onCommentRemoved={handleCommentRemoved}
        />)} */}
    </div>
}
