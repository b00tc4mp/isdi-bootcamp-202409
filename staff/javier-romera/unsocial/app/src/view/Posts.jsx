import { useState, useEffect } from 'react'

import { Post } from '../components/functional'

import { errors } from 'apu'

const { SystemError } = errors

import logic from '../logic'

import './Posts.css'

export default function Posts() {
    const [posts, setPosts] = useState([])
    const [initiated, setInitiated] = useState(false)

    useEffect(() => {
        try {
            logic.getPosts()
                .then(posts => {
                    setPosts(posts)

                    setInitiated(true)
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
                    else
                        alert(error.message)

                    console.error(error)

                    return
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }, [])

    const handleLiked = () => {
        try {
            logic.getPosts()
                .then(posts => {
                    setPosts(posts)
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
                    else
                        alert(error.message)

                    console.error(error)

                    return
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleDeleted = () => {
        try {
            logic.getPosts()
                .then(posts => {
                    setPosts(posts)
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
                    else
                        alert(error.message)

                    console.error(error)

                    return
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleCommentAdded = () => {
        try {
            logic.getPosts()
                .then(posts => {
                    setPosts(posts)
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
                    else
                        alert(error.message)

                    console.error(error)

                    return
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleCommentRemoved = () => {
        try {
            logic.getPosts()
                .then(posts => {
                    setPosts(posts)
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
                    else
                        alert(error.message)

                    console.error(error)

                    return
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    return <div className="Posts">
        {initiated && posts.map(post => <Post
            key={post.id}

            post={post}

            onLiked={handleLiked}

            onDeleted={handleDeleted}

            onCommentAdded={handleCommentAdded}

            onCommentRemoved={handleCommentRemoved}
        />)}
    </div>
}