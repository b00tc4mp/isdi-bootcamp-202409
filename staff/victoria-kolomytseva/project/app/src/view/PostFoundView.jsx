import { useState, useEffect } from 'react'

import logic from '../logic'

import AdFound from './components/AdFound'

export default function PostFoundView() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.log('PostFoundView-> useEffect "componentDidMount"')

        try {
            logic.getPosts('found')
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
            logic.getPosts('found')
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
            logic.getPosts('found')
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
            logic.getPosts('found')
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
            logic.getPosts('found')
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

    console.log(' PostFoundView-> render')

    return <div className="pt-12 pb-24 min-h-screen from-background-light to-background-dark bg-gradient-to-b flex flex-col space-y-10">
        {posts.map(post => <AdFound
            key={post.id}
            post={post}
            onLiked={handleLiked}
            onCommentAdded={handleCommentAdded}
            onCommentRemoved={handleCommentRemoved}
        />)}
    </div>
}
