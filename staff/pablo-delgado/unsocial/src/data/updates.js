//add likes property in posts

const posts = JSON.parse(localStorage.posts)

posts.forEach(post => post.likes = [])

localStorage.posts = JSON.stringify(posts)

// add comments array property in posts

localStorage.posts = JSON.stringify(JSON.parse(localStorage.posts).map(post => { post.comments = []; return post }))