const createPost = (userId, image, text) => {
  if (typeof userId !== 'string') throw new Error
  if (typeof image !== 'string') throw new Error
  if (typeof text !== 'string') throw new Error

  const posts = JSON.parse(localStorage.posts)

  const post = {
    id: uuid(),
    image: image,
    text: text,
    author: userId,
    date: new Date
  }

  posts.push(post)

  localStorage.posts = JSON.stringify(posts)
}