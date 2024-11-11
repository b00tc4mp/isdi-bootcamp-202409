import db from 'dat'
import createPost from './createPost.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            return createPost('672e1cf7fbf40da8a565ff5d', 'https://media.giphy.com/media/3ohhwfAa9rbXaZe86c/giphy.gif?cid=790b7611vkbow49vtlhlh26tztuwge5f7tsvouu717wswm5m&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'dancing')
                .then(() => console.log('post created'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())