import { useState, useEffect } from 'react'

import logic from '../logic'

import AdFound from './components/AdFound'

export default function PetFoundView() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.log('PetFoundView-> useEffect "componentDidMount"')

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

    console.log(' PetFoundView-> render')

    return <div className="pt-12 pb-24 min-h-screen from-background-light to-background-dark bg-gradient-to-b flex flex-col space-y-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 ml-6">PetLocator</h1>
        {posts.map(post => <AdFound
            key={post.id}
            post={post}
            onLiked={handleLiked}
            onCommentAdded={handleCommentAdded}
            onCommentRemoved={handleCommentRemoved}
        />)}
    </div>
}
