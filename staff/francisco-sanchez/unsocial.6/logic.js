//NEW SECTION FOR LOGIC FUNCTIONS
//-------------------------------

function registerUser(name, email, username, password, checkPassword) {
    //Validamos el que nombre no sea inferior a 2 carácteres
    if (name.length < 2) {
        throw new Error('Field name too short, min 3 chars')
    }

    //Validamos el email (que incluya al menos una '@ 'y un '.')
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new Error('invalid e-mail')

    //Busco si el usuario ya existe
    var user = users.find(function (user) {
        return user.username === username || user.email === email
    })

    //Validamos el password
    if (password !== checkPassword) {
        throw new Error('Passwords not match')
    }

    if (user) {
        throw new Error('The user ' + username + ' already exist in the database')
    }

    var newUser = { name: name, email: email, username: username, password: password }
    users.push(newUser)
}

function authenticateUser(username, password) {
    if (username.length < 4 || username.length > 12)
        throw new Error('unsername lenght should be between 4 and 12 chars')

    if (password.length === '')
        throw new Error('Password is required')

    var user = users.find(function (user) {
        return user.username === username && user.password === password
    })

    if (user === undefined)
        throw new Error('User or password are not valid')

    return user
}

/*function PostList() {
    Compo.call(this, document.createElement('div'))

    var title = new Heading('Posts', 3)
    this.add(title)

    try {
        //Mostramos los posts en orden inverso
        var posts = getPosts().toReversed()

        posts.forEach(function (post) {
            var _post = new PostList(post.username, post.image, post.text, post.date)
            this.add(_post)
        }.bind(this))

    } catch (error) {
        alert(error.message)
        console.error(error)
    }
}

PostList.prototype = Object.create(Compo.prototype)
PostList.prototype.constructor = PostList*/