const createPost = (username, image, text) => {
    if (username.length < 4 || username.length > 12)
        throw new Error('invalid username')

    //// Validate image input (assuming it's a URL or string, or can be any truthy value)
    if (typeof image !== 'string' || image.trim() === '')
        throw new Error('Invalid image');

    if (typeof text !== 'string' || text.trim() === '')
    if (text.lenght > 300)
        throw new Error('Exceeded character limit')

    const post = {
        image: image,
        text: text,
        username: username,
        date: new Date
    }

    posts.push(post)
}