import { getPosts } from '../logic/getPosts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Post from './Post'
import { useState,useEffect } from 'react'
import { likePost } from '../logic/getPosts'


function PostList(){

    function onLiked(postId, usuarioActual){
        likePost(postId, usuarioActual )
        
            setPosts(getPosts()),[]
        
}

    console.log('PostList -> render')
    const usuarioActual = sessionStorage.getItem("usuarioActual")
    
    const [posts, setPosts] = useState([])
    
    try {
        useEffect(() =>{
        setPosts(getPosts())},[]
    )
    } catch (error) {
        alert(error.message)

        console.error(error)
    }
    console.log(posts)
    return <div>
    <h3>Posts</h3>
    {posts.map(post => (
        <Post onLiked={onLiked} usuarioActual={usuarioActual} key={post.id} post={post} />

        ))}
        
    
</div>

}

export default PostList