const users = [
    {id:'4qadijryzdc', name: "flash", email: "flash@gmail.com", username: "flash", password: "123123123"},
    {id:'4qadimtuay0', name: "batman", email: "batman@gmail.com", username: "batman", password: "123123123"}

]

const persistedUsers = JSON.parse(localStorage.getItem("users"))

if(persistedUsers == undefined){
    //convierto la array en un string
    localStorage.setItem("users",JSON.stringify(users));
}

