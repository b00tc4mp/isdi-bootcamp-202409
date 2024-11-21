import { useState, useEffect } from 'react'

import { Post } from '../components/functional'

import logic from '../logic'

import './Home.css'


export default function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        try {
            logic.getPosts((error, posts) => {
                if (error) {
                    alert(error.message)

                    console.error(error)

                    return
                }

                setPosts(posts)
            })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }, [])


    const handleLiked = () => {
        try {
            logic.getPosts((error, posts) => {
                if (error) {
                    alert(error.message)

                    console.error(error)

                    return
                }

                setPosts(posts)
            })
        } catch (error) {
            alert(error.message)

            console.error(message)
        }
    }

    const handleDeleted = () => {
        try {
            logic.getPosts((error, posts) => {
                if (error) {
                    alert(error.message)

                    console.error(error)

                    return
                }

                setPosts(posts)
            })
        } catch (error) {
            alert(error.message)

            console.error(message)
        }
    }

    const handleCommentAdded = () => {
        try {
            logic.getPosts((error, posts) => {
                if (error) {
                    alert(error.message)

                    console.error(error)

                    return
                }

                setPosts(posts)
            })
        } catch (error) {
            alert(error.message)

            console.error(message)
        }
    }

    const handleCommentRemoved = () => {
        try {
            logic.getPosts((error, posts) => {
                if (error) {
                    alert(error.message)

                    console.error(error)

                    return
                }

                setPosts(posts)
            })
        } catch (error) {
            alert(error.message)

            console.error(message)
        }
    }




    return <div className="Home" id="posts">

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