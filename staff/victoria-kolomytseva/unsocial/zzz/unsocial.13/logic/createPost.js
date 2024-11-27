const createPost = (userId, image, text) => {
    //verificacion de los datos
    if (typeof userId !== 'string') throw new Error('invalid userId')
    if (typeof image !== 'string') throw new Error('invalid image')
    if (typeof text !== 'string') throw new Error('invalid text')

    const posts = JSON.parse(localStorage.posts)//Aquí estamos obteniendo todas las publicaciones anteriores que ya están almacenadas en el almacenamiento del navegador (localStorage).


    const post = {
        id: uuid(), // Genera un identificador único
        image: image,//Usa la imagen que se le pasó a la función
        text: text,
        autor: userId,// El autor de la publicación es el usuario que se pasó
        date: new Date// La fecha de la publicación es la fecha actual
    }


    posts.push(post)//Aquí estamos añadiendo el nuevo post a la lista de publicaciones anteriores

    localStorage.posts = JSON.stringify(posts)
}
//Dado que localStorage solo almacena texto, usamos JSON.stringify() para convertir el arreglo
//de publicaciones en un texto (string) antes de guardarlo.