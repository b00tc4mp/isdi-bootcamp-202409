import db from 'dat'
import registerUser from './registerUser.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
  .then(() => {
    try {
      registerUser('Rocket', 'rocket@gat.com', 'rocketgat', 'criscris', 'criscris')
        .then(() => console.log('user registered'))
        .catch(console.error)

    } catch (error) {
      console.error(error)
    }
  })