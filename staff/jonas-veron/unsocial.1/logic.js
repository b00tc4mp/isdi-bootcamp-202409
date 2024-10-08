function registerUser(nameInput, emailInput, usernameInput, passwordInput, passwordRepeatInput){

    if(nameInput.length < 2){
    throw new Error('Invalid name')
}

if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(emailInput)) {
    throw new Error('invalid e-mail')
}

if(usernameInput.length < 4 || username.length > 12){
    throw new Error('Invalid username')
}

if(passwordInput.length < 8){
    throw new Error('Invalid password')
}

if(passwordRepeatInput !== passwordInput){
    throw new Error('Passwords do not match!')
}
//check if the username or email already exists
var user = users.find(function(element){
    return element.username === usernameInput || element.email === emailInput
})

if(user !== undefined){
    throw new Error('User already exists')
}

var user = {
    name: nameInput,
    email: emailInput,
    username: usernameInput,
    password: passwordInput
}

users.push(user)
}

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