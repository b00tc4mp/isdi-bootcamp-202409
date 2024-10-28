const createPost = (userId, image, text) => {
    if (typeof userId !== 'string')
        throw new Error('Invalid username')

    if (typeof image !== 'string')
        throw new Error('Inser a link to an image')

    if (typeof text !== 'string')
        throw new Error('Insert a text, even if it is an empty space')

    const posts = JSON.parse(localStorage.posts)

    const post = {
        id: uuid(),
        image: image,
        text: text,
        author: userId,
        date: new Date
    }

    posts.push(post)

    localStorage.posts = JSON.stringify(posts)
}