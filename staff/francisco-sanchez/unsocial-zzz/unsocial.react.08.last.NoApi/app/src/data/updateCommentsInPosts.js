//Meter comentarios en todos los posts de mi base de datos


// add comments array property in posts

localStorage.posts = JSON.stringify(JSON.parse(localStorage.posts).map(post => { post.comments = []; return post }))