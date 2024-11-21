import { useState, useEffect } from 'react'

import PostItem from '../components/function/PostItem'
import logic from '../logic'

export default function PostList() {
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

            console.error(error)
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

            console.error(error)
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

            console.error(error)
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

            console.error(error)
        }
    }

    return <div className='PostList pb-[1.3rem] pt-[1.7rem]'>
        {posts.map(post => <PostItem
            key={post.id}

            post={post}

            onLiked={handleLiked}

            onDeleted={handleDeleted}

            onCommentAdded={handleCommentAdded}

            onCommentRemoved={handleCommentRemoved}
        />)}
    </div>
}
//Estas funciones lo que hacen es repintar, la de delete lo que hace es traer de nuevo los posts al home.
