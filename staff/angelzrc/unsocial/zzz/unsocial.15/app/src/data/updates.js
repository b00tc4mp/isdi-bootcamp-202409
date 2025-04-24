const posts = JSON.parse(localStorage.posts)

posts.forEach(post => post.likes = [])

localStorage.posts = JSON.stringify(posts)