import getPosts from './getPosts.js'

try {
    const posts = getPosts('m2w6ehc8bg') //la lógica primero validará q el user exista, sino no t dejo seguir

    console.log(posts)
} catch (error) {
    console.error(error)
}