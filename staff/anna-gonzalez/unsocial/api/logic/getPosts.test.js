import getPosts from './getPosts.js'

try {
    const posts = getPosts('m2w6ehc8bg')
    console.log(posts)
} catch (error) {
    console.error(error)
}