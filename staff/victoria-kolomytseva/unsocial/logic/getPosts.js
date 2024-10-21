//obtener las publicaciones guardadas en localStorage
const getPosts = () => {
    console.log(localStorage)
    const posts = JSON.parse(localStorage.posts)

    return posts.toReversed()//Devolver las publicaciones en orden inverso para que 
    //manera de recuperar y mostrar publicaciones almacenadas en el navegador, priorizando las últimas
}