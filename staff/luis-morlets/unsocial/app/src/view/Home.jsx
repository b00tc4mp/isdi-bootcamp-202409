import { useEffect, useState } from 'react'

import { PostItem } from '../components/functional'

import logic from '../logic'

import { errors } from 'com'

const { SystemError } = errors

export default function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {

        try {
            logic.getPosts((error, posts) => {
                if (error) {
                    if (error instanceof SystemError)
                        alert('Something went wrong, try again later.')
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
                        alert('Something went wrong, try again later.')
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
                        alert('Something went wrong, try again later.')
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

    const handleCommented = () => {
        try {
            logic.getPosts((error, posts) => {
                if (error) {
                    if (error instanceof SystemError)
                        alert('Something went wrong, try again later.')
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
                        alert('Something went wrong, try again later.')
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
    console.log('PostList -> render')
    return <div className="flex flex-col gap-6 box-border bg-slate-400 pt-20 pb-12">

        {posts.map(post => <PostItem
            key={post.id}
            post={post}
            onLiked={handleLiked}
            onDeleted={handleDeleted}
            onCommented={handleCommented}
            onCommentRemoved={handleCommentRemoved}
        />)}
    </div>
}