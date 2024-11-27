import { useState, useEffect } from 'react'

import { Post } from '../components/functional'

import logic from '../logic'

// import './Posts.css'
import useContext from './useContext'


export default function Home() {
    const [posts, setPosts] = useState([])

    const { alert } = useContext()

    useEffect(() => {
        console.log('Home -> useEffect "componentDidMount"')

        try {
            logic.getPosts()
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

    const handleLiked = () => {
        try {
            logic.getPosts()
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
    const handleDeleted = () => {
        try {
            logic.getPosts()
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

    const handleCommentAdded = () => {
        try {
            logic.getPosts()
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

    const handleCommentRemoved = () => {
        try {
            logic.getPosts()
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

    return <section className='PostList'>
        <h3 class="text-center text-[18px] text-[#333]"> Posts</h3>
        {posts.map(post => <Post
            key={post.id}

            post={post}

            onLiked={handleLiked}

            onDeleted={handleDeleted}

            onCommentAdded={handleCommentAdded}

            onCommentRemoved={handleCommentRemoved}
        />)}

    </section >
}


