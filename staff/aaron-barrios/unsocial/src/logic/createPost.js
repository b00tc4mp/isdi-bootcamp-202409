import uuid from '../data/uuid'


// ----- POSTS STUFF ------
const createPost = (text, image) => {
    // if (typeof text !== 'string') throw new Error('invalid text')
    // if (typeof image !== 'string') throw new Error('invalid image')

    const posts = JSON.parse(localStorage.posts)

    const date = new Date();
    const formattedDate = date.toLocaleDateString();  // Obtiene solo la fecha
    const formattedTime = `${date.getHours()}:${date.getMinutes()}`; //obtiene la hora en hora y minutos

    const post = {
        id: uuid(),
        image: image,
        text: text,
        author: sessionStorage.userId,
        date: `${formattedDate} ${formattedTime}`,
        //new Date().toLocaleString() //recoge fecha y hora
        likes: []
    }

    posts.push(post)

    localStorage.posts = JSON.stringify(posts)
}

export default createPost