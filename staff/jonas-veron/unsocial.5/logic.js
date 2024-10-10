
//function to register user
function registerUser(name, email, username, password, passwordRepeat){

    if(name.length < 2){
    throw new Error('Invalid name')
}

if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)) {
    throw new Error('invalid e-mail')
}

if(username.length < 4 || username.length > 12){
    throw new Error('Invalid username')
}

if(password.length < 8){
    throw new Error('Invalid password')
}

if(passwordRepeat !== password){
    throw new Error('Passwords do not match!')
}
//check if the username or email already exists
var user = users.find(function(user){
    return user.username === username || user.email === email
})

if(user !== undefined){
    throw new Error('User already exists')
}

var user = {
    name: name,
    email: email,
    username: username,
    password: password
}

users.push(user)
}


//function to autenticate logins

function autenticateUser(username, password){
// create conditions for login
if(username.length < 4 || username.length > 12 ){
    throw new Error('Invalid username')
}

if(password.length < 8){
    throw new Error('Invalid password')
}

var user = users.find(function(element){
return(element.username === username) && (element.password === password)
})
if(user === undefined){
throw new Error('Wrong credentials')
}
return user
}