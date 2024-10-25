const  getUsername = userId => { 

    const persistedUsers = JSON.parse(localStorage.getItem("users"))
    
    const user = persistedUsers.find(usuario=>usuario.id==userId)
    
    if(typeof user == "undefined"){
        throw new Error ("no encontrado")
    }
    return user.username
}

export default getUsername