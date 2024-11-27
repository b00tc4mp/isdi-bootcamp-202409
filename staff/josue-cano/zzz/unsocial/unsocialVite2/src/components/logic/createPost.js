import uuid from "../../data/uuid"

const createPost = (userId,username, image, text) => {


    // if (username.length < 4 || username.length > 12) throw new Error('invalid username')

    if (typeof userId !== 'string') throw new Error('invalid userId')

    if (typeof image !== 'string') throw new Error('invalid image')
        
    if (typeof text !== 'string') throw new Error('invalid text')

        if (!localStorage.posts) {
            localStorage.posts = JSON.stringify([]);
        }
    
        const posts = JSON.parse(localStorage.posts);

    const post = {
        id: uuid(),
        image: image,
        text: text,
        username: username,
        date: new Date,
        fans: []
    }
    console.log("Post creado:", post);
    posts.push(post)
    
    localStorage.posts = JSON.stringify(posts)
    console.log("Posts guardados en localStorage:", posts);
}

export default createPost