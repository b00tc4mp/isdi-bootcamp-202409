const createPost = (username, image, text) => {
    const post = {
        image: image,
        text: text,
        username: username,
        date: new Date
    }

    posts.push(post)
}

const getPosts = () => posts

