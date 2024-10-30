
const posts = JSON.parse(localStorage.posts)

posts.forEach(post => post.like = [])

localStorage.posts = JSON.stringify(posts)