//Function to create the post

const createPost = (username, image, text) => {
    if (username.length < 4 || username.length > 12)
        throw new Error('invalid username')
//// Validate image input (assuming it's a URL or string, or can be any truthy value)
    const post = {
        image: image,
        text: text,
        username: username,
        date: new Date
    }

    posts.push(post)
}