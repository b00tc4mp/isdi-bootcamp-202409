import { useState, useEffect } from 'react'

import { Post } from '../components/functional'

import { errors } from 'apu'

const { SystemError } = errors

import logic from '../logic'

import './Posts.css'

export default function Posts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        try {
            logic.getPosts((error, posts) => {
                if (error) {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
                    else
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
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
                    else
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
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
                    else
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
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
                    else
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
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
                    else
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

    return <div className="Posts">
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