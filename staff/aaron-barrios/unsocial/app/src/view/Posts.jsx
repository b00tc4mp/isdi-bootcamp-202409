import { useState, useEffect } from 'react'

import { Post } from '../components/functional'

import logic from '../logic'

import './Posts.css'


export default function Posts() {
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




    return <div className="Posts" id="posts">

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