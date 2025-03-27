import uuid from "../data/uuid"

const createPost = (image, text) => {
  if (typeof image !== 'string') throw new Error
  if (typeof text !== 'string') throw new Error

  const posts = JSON.parse(localStorage.posts)

  const post = {
    id: uuid(),
    image: image,
    text: text,
    author: sessionStorage.loggedUserId,
    date: new Date,
    likes: []
  }

  posts.push(post)

  localStorage.posts = JSON.stringify(posts)
}

export default createPost