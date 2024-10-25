import uuid from "../data/uuid"

export default (postId, textarea) => {
  const posts = JSON.parse(localStorage.posts)

  const post = posts.find(({ id }) => id === postId)

  const { comments } = post

  // const comment = {
  //   id: uuid(),
  //   // author: loggedUser,
  //   textarea: textarea,
  //   date: new Date
  // }

  // const comments = posts.comments

  comments.push(textarea)

  localStorage.posts = JSON.stringify(posts)
}