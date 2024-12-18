import { useState, useEffect } from 'react'
import logic from '../logic'
import Post from './components/Post'

export default function Home() {
    const [posts, setPosts] = useState([])
    const userId = logic.getUserId()

    useEffect(() => {
        console.log('Home -> useEffect "componentDidMount"')

        try {
            logic.getPosts('')
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

    const handleDeleted = () => {
        try {
            logic.getPosts('')
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

    return <div className="pt-12 pb-24 min-h-screen from-background-light to-background-dark bg-gradient-to-b flex flex-col space-y-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 ml-6">PetLocator</h1>
        {posts.map(post => <Post
            key={post.id}
            userId={userId}
            post={post}
            onDeleted={handleDeleted}
        />)}
    </div>
}
