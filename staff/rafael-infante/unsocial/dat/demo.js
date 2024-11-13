import mongoose from "mongoose"
import models from "./models.js"

const { User, Post, Comment } = models

mongoose.connect('mongodb://localhost/unsocial-test')
  .then(() => {
    const user = new User({
      name: 'Easy Miyaki',
      email: 'easy@miyaki.com',
      username: 'easymiyaki',
      password: '123123123'
    })
    return user.save()
  })
  .then(user => {
    console.log(user)

    const post = new Post({
      author: user.id,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRISnn5eqW2gCKEVKMtir3Bm3-AjFGWYEfAqw&s',
      text: 'si señorrrr',
      date: new Date
    })

    const comment = new Comment({
      author: user.id,
      text: 'Que bella soy',
      date: new Date
    })
    post.comments.push(comment)

    return post.save()
  })
  .then(post => {
    console.log(post)
  })
  .catch(console.error)
  .finally(() => mongoose.disconnect())