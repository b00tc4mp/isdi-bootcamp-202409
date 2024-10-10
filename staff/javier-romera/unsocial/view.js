/**
 * Constructs Login instances
 */
function Login() { // La función login, monta toda la vista del login
    Compo.call(this, document.createElement('section')) // Le asignamos a login las popiedades de Compo, el container principal será section

    var compo = this // Variable auxiliar para que el código sea más bonito y no ver todo el rato "this" sino "compo"

    var title = new Heading('Login', 2) // Creación del título
    compo.add(title) // Añadimos el título al compo

    var form = new Form() // Creación del formulario
    compo.add(form)

    form.add(new Label('Username', 'username')) // Añadimos un label (el de username) al formulario
    var usernameInput = new Input('text', 'username')
    form.add(usernameInput) // Añadimos un input (el de username) al formulario

    form.add(new Label('Password', 'password')) // Añadimos un label (el de password) al formulario
    var passwordInput = new Input('password', 'password')
    form.add(passwordInput) // Añadimos un input (el de password) al formulario

    var submitButton = new Button('submit', 'Login') // Creación del botón para submitear el formulario
    form.add(submitButton) // Añadimos el botón al formulario

    form.addBehavior('submit', function (event) { // El comportamiento (addEventListener) del botón de submitear
        event.preventDefault() // Un clásico, OG, leyenda, fiera, máquina

        var username = usernameInput.getValue() // Almacenamos el valor escrito en el input
        var password = passwordInput.getValue() // Almacenamos el valor escrito en el input

        try {
            loggedInUser = authenticateUser(username, password)

            form.reset()

            compo.remove()

            var home = new Home() // Creación de la pantalla home

            page.add(home) // Añadimos la pantalla home a la page (a la vista de la página)
        } catch (error) {
            passwordInput.setValue('') // En caso de error reiniciamos el input de la contraseña

            alert(error.message)

            console.error(error)
        }
    })

    var registerLink = new Link('Register') // Creación del link para ir a la pantalla de registro
    compo.add(registerLink) // Lo añadimos al compo (la sección) del login

    registerLink.addBehavior('click', function (event) { // Comportamiento del link
        event.preventDefault() // Lo volvió a hacer

        form.reset()

        compo.remove()

        var register = new Register() // Creamos la pantalla de register

        page.add(register) // La ponemos a la vista
    })
}

Login.prototype = Object.create(Compo.prototype) // Le decimos a Login que es heredero de Compo
Login.prototype.constructor = Login // Le decimos a Login que su constructor es Login (con la línea anterior se asigna a Compo, hay que rectificarlo)

/**
 * Constructs Register instances
 */
function Register() { // Función para crear la pantalla de registro
    Compo.call(this, document.createElement('section')) // Asignamos a Register las propiedades de Compo

    var compo = this // Variable auxiliar

    // Creación de un nuevo título y formulario con sus respectivos campos y un botón
    var title = new Heading('Register', 2)
    compo.add(title)

    var form = new Form
    compo.add(form)

    form.add(new Label('Name', 'name'))
    var nameInput = new Input('text', 'name')
    form.add(nameInput)

    form.add(new Label('E-mail', 'email'))
    var emailInput = new Input('email', 'email')
    form.add(emailInput)

    form.add(new Label('Username', 'username'))
    var usernameInput = new Input('username', 'text')
    form.add(usernameInput)

    form.add(new Label('Password', 'password'))
    var passwordInput = new Input('password', 'password')
    form.add(passwordInput)

    form.add(new Label('Confirm Password', 'repeatPassword'))
    var passwordRepeatInput = new Input('repeatPassword', 'password')
    form.add(passwordRepeatInput)

    var submitButton = new Button('submit', 'Register')
    form.add(submitButton)

    form.addBehavior('submit', function (event) { // Comportamiento del botón
        event.preventDefault() // event.preventDefault() siempre muy arriba en los rankings (un poco por debajo de España)

        // Almacenamos todos los valores de los inputs
        var name = nameInput.getValue()
        var email = emailInput.getValue()
        var username = usernameInput.getValue()
        var password = passwordInput.getValue()
        var confirmpassword = passwordRepeatInput.getValue()

        try {
            registerUser(name, email, username, password, confirmpassword) // Registramos al usuario (logic.js)

            form.reset()

            compo.remove() // Eliminamos el compo (la sección) en la que nos encontramos (Register)

            page.add(login) // En caso de que registremos  al usuario volvemos a la pantalla Login
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    })

    var loginLink = new Link('Login') // Creación del link que nos lleva de vuelta a login
    compo.add(loginLink)

    loginLink.addBehavior('click', function (event) { // Comportamiento del link
        event.preventDefault() // Nooooo imposible, soy fan desde pequeñito una foto porfa

        compo.remove() // Borramos el compo (Register)

        page.add(login) // Enseñamos Login
    })
}

/**
 * Constructs Home instances
 */
Register.prototype = Object.create(Compo.prototype) // Le decimos a Register que es heredero de Compo
Register.prototype.constructor = Register // Le decimos a Register que su constructor es Register (con la línea anterior se asigna a Compo, hay que rectificarlo)

function Home() { // Función constructora de la pantalla Home
    Compo.call(this, document.createElement('section')) // Le asignamos a Home las propiedades de Compo
    var compo = this // Variable auxiliar

    // Creamos las partes de Home
    var title = new Heading('Home', 2)
    compo.add(title)

    var welcome = new Heading('Welcome, ' + loggedInUser.name + '!', 3)
    compo.add(welcome)

    var logoutButton = new Button('button', 'Logout')
    compo.add(logoutButton)

    logoutButton.addBehavior("click", function (event) { // Comportamiento del botón de logout
        event.preventDefault() // Si event.preventDefault() tiene 100 fans, yo soy uno de  ellos, si event.preventDefault() tiene 10 fans, yo soy uno de ellos, si event.preventDefault() tiene 1 fan, yo soy ese fan, si event.preventDefault() no tiene fans, es que me han matado.

        loggedInUser = null // Desconectamos al usuario

        compo.remove() // Borramos Home

        page.add(login) // Añadimos login a la vista
    })
}

Home.prototype = Object.create(Compo.prototype) // Le decimos a Home que es heredero de Compo
Home.prototype.constructor = Home // Le decimos a Home que su constructor es Home (con la línea anterior se asigna a Compo, hay que rectificarlo)