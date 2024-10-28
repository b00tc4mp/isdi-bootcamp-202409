import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { likePost, isFan } from '../logic/getPosts';
// import { useState } from 'react'



const Post = function({ post,usuarioActual, onLiked }) {
    
    return (
        <article>
            <h4>{post.username}</h4>
            <img src={post.image} style={{ width: "100%" }} alt="Post image" />
            <button
                className="like"
                type="button"
                title="me gusta"
                onClick={() => onLiked(post.id, usuarioActual)}
            >
                <FontAwesomeIcon
                    icon={isFan(post.id, usuarioActual) ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}
                /> 
                &nbsp;{post.fans.length}
            </button>
            <p>{post.text}</p>
            <time>{new Date(post.date).toDateString()}</time>
        </article>
    );
};



// const Post = function({ post }) {
//     const [liked, setLiked] = useState(isFan(post.id, usuarioActual)); // Estado local para manejar si está "liked"
//     const [fans, setFans] = useState(post.fans.length); // Estado local para manejar el número de fans

//     // Función para manejar el clic y actualizar el estado local
//     const handleLikeClick = () => {
//         likePost(post.id, usuarioActual); // Ejecutamos la función para dar "like"
//         setLiked(!liked); // Alternamos el estado "liked"
        
//         // Actualizamos el número de fans en función de si el usuario dio "like" o "unlike"
//         if (liked) {
//             setFans(fans - 1); // Si el post ya estaba "liked", restamos 1 al número de fans
//         } else {
//             setFans(fans + 1); // Si no estaba "liked", sumamos 1 al número de fans
//         }
//     };

//     return (
//         <article>
//             <img src={post.image} style={{ width: "100%" }} alt="Post image" />
//         <div className="titulo">
//             <button className="like" type="button" title="me gusta"onClick={handleLikeClick}>
//                 {/* Cambiamos el icono según el estado local  */}
//                 <FontAwesomeIcon icon={liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} /> 
//                 {fans} {/* Mostramos el número de fans actualizado */}
//             </button>
//             <h4>{post.username}</h4>
//             </div>
//             <p>{post.text}</p>
//             <time>{new Date(post.date).toDateString()}</time>
//         </article>
//     );
// };

export default Post;
