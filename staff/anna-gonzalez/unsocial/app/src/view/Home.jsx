import { useState, useEffect } from 'react'
import { Post } from './components'
import logic from '../logic'
import './Home.css'
import { errors } from 'com'

const { SystemError } = errors

export default function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.log('Home -> useEffect "componentDidMount"')

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

    const handleSaved = () => {
        try {
            logic.getPosts((error, posts) => {
                if (error) {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
                    else
                        alert(error.message)

                    return
                }

                setPosts(posts)
            })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleLiked = () => {
        try {
            logic.getPosts((error, posts) => {
                if (error) {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
                    else
                        alert(error.message)

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

                    return
                }

                setPosts(posts)
            })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    console.log('Home -> render')

    return <div className="Home">
        {posts.map(post => <Post
            key={post.id}
            post={post}
            onSaved={handleSaved}
            onLiked={handleLiked}
            onDeleted={handleDeleted}
            onCommentAdded={handleCommentAdded}
            onCommentRemoved={handleCommentRemoved}
        />)}
    </div>
}