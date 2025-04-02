const getUserName = userId => {//buscar el nombre de un usuario basado en el userId

    console.log(userId)
    if (typeof userId !== 'string') throw new Error('invalid userId')

    const users = JSON.parse(localStorage.users)//la función está obteniendo todos los usuarios que están guardados en el almacenamiento local del navegador (localStorage)

    const user = users.find(user => user.id === userId)//Usa find() para encontrar al primer usuario que tiene ese id

    if (!user) throw new Error('user not found')//Si no encuentra ningún usuario con ese userId, (muestra) un error

    return user.name //si encontró al usuario, la función devuelve su nombre
}