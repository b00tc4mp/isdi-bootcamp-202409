function toggleLikePost(postId) {
  if (typeof postId !== 'string') throw new Error('invalid post')

  const posts = JSON.parse(localStorage.posts)

  const post = posts.find(({ id }) => id === postId)

  if (!post) throw new Error('post not found')

  //const likes = post.likes
  const { likes } = post
  const { loggedUserId } = sessionStorage

  // buscamos en el array de likes
  const index = likes.indexOf(loggedUserId)
  // si esta el id del usuario logeado lo sacamos
  // si no esta (index === -1) lo añadimos al array 
  if (index < 0) likes.push(loggedUserId)
  else likes.splice(index, 1)

  localStorage.posts = JSON.stringify(posts)
}

export default toggleLikePost