const createPost = (username, image, text) => {
    if (username.length < 4 || username.length > 14)
        throw new Error('invalid username')

    const post = {
        image: image,
        text: text,
        username: username,
        date: new Date,
        likes: 0
    }
    posts.push(post)
}