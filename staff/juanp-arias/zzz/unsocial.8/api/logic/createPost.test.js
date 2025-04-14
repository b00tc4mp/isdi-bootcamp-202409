import createPost from './createPost.js'

try {
    createPost('m2x63gb7wns', 'https://media.giphy.com/media/3ohhwfAa9rbXaZe86c/giphy.gif?cid=790b7611vkbow49vtlhlh26tztuwge5f7tsvouu717wswm5m&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'dancing')
} catch (error) {
    console.error(error)
}