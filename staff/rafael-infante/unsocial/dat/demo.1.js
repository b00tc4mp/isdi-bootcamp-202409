import mongoose from 'mongoose'

const { Schema, model, Types: { ObjectId } } = mongoose

const user = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 2
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 30
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  }
}, { versionKey: false })

const post = new Schema({
  author: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  image: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true,
    maxLength: 200
  },
  date: {
    type: Date,
    required: true
  }
}, { versionKey: false })

const User = model('User', user)
const Post = model('Post', post)

mongoose.connect('mongodb://localhost/unsocial-test')
  .then(() => {
    return User.findOne({ username: 'elverdugo' })
  })
  .then(user => {
    console.log(user)
    const post = new Post({
      author: user.id,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS48qNlZuDjIIyXO02u_85S3d1uu62rwRJetEf4HwUPgGvbQXzC9asgeabJO-x8EdIO-TM&usqp=CAU',
      text: 'hola gente',
      date: new Date
    })

    return post.save()
  })
  .then(post => {
    console.log(post)
  })
  .catch(console.error)
  .finally(() => mongoose.disconnect())