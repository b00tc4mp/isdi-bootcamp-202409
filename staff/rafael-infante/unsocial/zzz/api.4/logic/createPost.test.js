import createPost from "./createPost.js"

import { storage } from "../data/index.js"

try {
  createPost('m2wh96xo6vr', 'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg', 'Soy un gatito guapo')
  console.log(storage.posts)
} catch (error) {
  console.error(error)
}