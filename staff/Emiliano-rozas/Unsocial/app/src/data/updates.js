// add likes property in posts

const posts = JSON.parse(localStorage.posts)

posts.forEach(posts => posts.likeby = [])

localStorage.posts = JSON.stringify(posts)

localStorage.posts = JSON.stringify(JSON.parse(localStorage.posts).map(post => { post.comments = []; return post }))