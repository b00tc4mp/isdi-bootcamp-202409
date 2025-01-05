import { useState, useEffect } from 'react'
import logic from '../logic'
import Post from './components/Post'
import { Header } from './components'

export default function Home() {
    const [posts, setPosts] = useState([])
    const userId = logic.getUserId()

    useEffect(() => {
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

    return <div className="pb-24 min-h-screen from-background-light to-background-dark bg-gradient-to-b flex flex-col space-y-10">
        <Header />

        {posts.map(post => <Post
            key={post.id}
            userId={userId}
            post={post}
            onDeleted={handleDeleted}
        />)}
    </div>
}
