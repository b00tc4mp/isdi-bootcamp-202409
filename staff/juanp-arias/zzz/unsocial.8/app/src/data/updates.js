// add likes property in posts

const posts = JSON.parse(localStorage.posts)

posts.forEach(post => post.likes = [])

localStorage.posts = JSON.stringify(posts)

//funcion para añadir el array vacio de comentarios en los posts... de esta forma todos los comentarios que se hacen tienen donde entrar.
localStorage.posts = JSON.stringify(JSON.parse(localStorage.posts).map(post => { post.comments = []; return post }))
