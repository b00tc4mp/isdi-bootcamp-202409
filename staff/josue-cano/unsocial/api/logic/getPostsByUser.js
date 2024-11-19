import { storage } from '../data/index.js'


export default (userId) => {
    
    const posts = storage.posts.filter(x => x.author === userId)
    

    return posts.toReversed()
}