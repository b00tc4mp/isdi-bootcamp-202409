import uuid from '../data/uuid'


// ----- POSTS STUFF ------
const createPost = (userId, image, text) => {
    if (typeof userId !== 'string') throw new Error('invalid userId')
    if (typeof image !== 'string') throw new Error('invalid image')
    if (typeof text !== 'string') throw new Error('invalid text')

    const posts = JSON.parse(localStorage.posts)

    const date = new Date();
    const formattedDate = date.toLocaleDateString();  // Obtiene solo la fecha
    const formattedTime = `${date.getHours()}:${date.getMinutes()}`; //obtiene la hora en hora y minutos

    const post = {
        id: uuid(),
        image: image,
        text: text,
        author: userId,
        date: `${formattedDate} ${formattedTime}`
        //new Date().toLocaleString() //recoge fecha y hora
    }

    posts.push(post)

    localStorage.posts = JSON.stringify(posts)
}

export default createPost