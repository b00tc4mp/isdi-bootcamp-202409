import addComment from "./addComment.js"

import { storage } from "../data/index.js"

try {
  addComment('m31o037p6yl', 'holaaaaa', 'm2wh96xo6vr')
  console.log(storage.posts)
} catch (error) {
  console.error(error)
}