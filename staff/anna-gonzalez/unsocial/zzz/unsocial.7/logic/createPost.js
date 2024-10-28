function createPost(username, image, text) {
    if (username.length < 4 || username.length > 12)
        throw new Error('Invalid username')

    if (image === undefined)
        throw new Error('Inser a link to an image')

    if (text === undefined)
        throw new Error('Insert a text, even if it is an empty space')

    var post = {
        image: image,
        text: text,
        username: username,
        date: new Date
    }

    posts.push(post)
}