const posts = JSON.parse(localStorage.posts)

posts.forEach(post => postlikes = [])

localStorage.posts = JSON.stringify(posts)