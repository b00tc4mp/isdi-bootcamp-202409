import { useState, useEffect } from 'react'
import logic from '../logic'
import Post from './components/Post'

export default function PostFoundView() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.log('Home -> useEffect "componentDidMount"')

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

    // const handleLiked = () => {
    //     try {
    //         // logic.getPosts()
    //         //     .then(setPosts)
    //         //     .catch(error => {
    //         //         alert(error.message)

    //         //         console.error(error)
    //         //     })
    //     } catch (error) {
    //         alert(error.message)

    //         console.error(error)
    //     }
    // }

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

    // const handleCommentAdded = () => {
    //     try {
    //         // logic.getPosts()
    //         //     .then(setPosts)
    //         //     .catch(error => {
    //         //         alert(error.message)

    //         //         console.error(error)
    //         //     })
    //     } catch (error) {
    //         alert(error.message)

    //         console.error(error)
    //     }
    // }

    // const handleCommentRemoved = () => {
    //     try {
    //         // logic.getPosts()
    //         //     .then(setPosts)
    //         //     .catch(error => {
    //         //         alert(error.message)

    //         //         console.error(error)
    //         //     })
    //     } catch (error) {
    //         alert(error.message)

    //         console.error(error)
    //     }
    // }

    console.log('Home -> render')

    return <div className="pt-12 pb-24 min-h-screen from-background-light to-background-dark bg-gradient-to-b flex flex-col space-y-10">
        {posts.map(post => <Post
            key={post.id}
            post={post}
            onDeleted={handleDeleted}
        />)}
    </div>
}
