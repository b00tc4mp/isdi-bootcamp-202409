import { useState, useEffect } from 'react'

//import { Component } from "react";

//aquest import el canviaré quan tregui la home i la modifiqui per postList (o Posts)
import PostItem from "../components/functional/Post";

//import getPosts from "../../logic/getPosts";

import logic from "../logic";

import './PostList.css'


//export default class extends Component {
export default function PostList({ onManageUsers }) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.log('Posts / PostList -> componentDidMount')

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
            alert(error.message);
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
            alert.error(error)
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
        } catch {
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
        } catch {
            alert.error(error)
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
        } catch {
            alert.error(error)
            console.error(error)
        }
    }

    const handleManageUsers = event => {
        event.preventDefault()
        onManageUsers()
    }


    console.log('Posts -> render')
    {/* Botón para moderadores, eliminar todos los posts */ }
    /* { logic.isUserRoleModerator() && <Button onClick={handleDeleteClick}>🔪 Kill </Button> } */
    return <main className="Home flex items-center justify-center min-h-screen">

        <div className="container  bg-blue-900 p-8 rounded-md">
            {logic.isUserRoleModerator() && <div className="bg-gray-600">
                <h3 className="text-3m">Admin bar</h3>
                <a onClick={handleManageUsers} className="cursor-pointer">Manage users</a>
            </div>}


            {/* <h3>Posts</h3> */}
            {posts.map(post => <PostItem
                key={post.id}
                post={post}

                onLiked={handleLiked}

                onDeleted={handleDeleted}

                onCommentAdded={handleCommentAdded}

                onCommentRemoved={handleCommentRemoved}

            />)}
        </div>
    </main>

}