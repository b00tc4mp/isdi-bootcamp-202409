import { validate, errors } from 'com'

const { SystemError } = errors

export default (postId) => {
  validate.id(postId, 'postId')

  const posts = JSON.parse(localStorage.posts)
  const post = posts.find(({ id }) => id === postId)

  const userId = sessionStorage.userId
  const users = JSON.parse(localStorage.users)
  const user = users.find(({ id }) => id === userId)

  if (!post) throw new Error('post not found')

  const { savedPosts } = user

  const index = savedPosts.indexOf(postId)

  if (index < 0) savedPosts.push(postId)

  localStorage.users = JSON.stringify(users)
}


// FRAGMENTO DE CÓDIGO A METER POR CONSOLA:
// const users = JSON.parse(localStorage.users)

// users.forEach(user => user.savedPosts = [])

// localStorage.users = JSON.stringify(users) 