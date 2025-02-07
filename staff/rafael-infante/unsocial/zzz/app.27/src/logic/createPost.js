import { validate } from "./helpers"

import uuid from "../data/uuid"
import logic from "."

export default (image, text) => {

  validate.image(image)
  validate.text(text)

  const posts = JSON.parse(localStorage.posts)

  const post = {
    id: uuid(),
    image: image,
    text: text,
    author: logic.getUserId(),
    date: new Date,
    likes: [],
    comments: []
  }

  posts.push(post)

  localStorage.posts = JSON.stringify(posts)
}