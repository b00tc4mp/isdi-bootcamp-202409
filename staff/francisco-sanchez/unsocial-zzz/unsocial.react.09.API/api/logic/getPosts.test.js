import getPosts from './getPosts'

try {
    const posts = getPosts('m2ey7tvjg0t') //userId //asumimos que vamos a necesitar el userId
    console.log(posts)
} catch {
    console.error(error)
}