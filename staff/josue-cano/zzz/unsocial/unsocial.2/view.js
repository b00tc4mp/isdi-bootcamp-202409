function buildFormField(id, text, type) {

    var label = document.createElement("label");
    label.htmlFor = id;
    label.innerText = text;

    var input = document.createElement("input");
    input.type = type;
    input.id = id;

    return [label, input];

}
function buildButton(text, type) {
    var button = document.createElement("button");
    button.type = type;
    button.innerText = text;

    return button
}


function buildLoginSection() {
    // Creación de la sección de login
    var compo = new Compo(document.createElement('section'));

    var section = compo.container;

    var tittle = document.createElement("h2");
    tittle.innerText = "Login";
    section.appendChild(tittle);

    // Crear formulario de login
    var form = document.createElement('form');
    //aqui le estamos diciendo que el formulario va en la seccion que es el padre y form es el hijo
    section.appendChild(form);

    var usernameField = buildFormField("username", "Username", "text");
    form.appendChild(usernameField[0]);
    form.appendChild(usernameField[1]);

    var passwordField = buildFormField("password", "Password", "password");
    form.appendChild(passwordField[0]);
    form.appendChild(passwordField[1]);

    var submitButton = buildButton("Login", "submit");
    form.appendChild(submitButton);




    form.addEventListener('submit', function (event) {
        event.preventDefault();

        //guardo los valores de login en las variables
        var username = usernameField[1].value;
        var password = passwordField[1].value;

        try {
            loggedInUser = authenticateUser(username, password);
            form.reset();
            section.remove();
            var homeSection = buildHomeSection();
            body.add(homeSection);

        } catch (error) {
            passwordField[1].value = "";
            alert(error.message);
            console.error(error);
        }


    });


    // Crear enlace para ir a la página de registro
    var registerLink = document.createElement('a');
    registerLink.href = '';
    registerLink.innerText = 'Register';
    section.appendChild(registerLink);
    // Evento al clicar el enlace de registro
    registerLink.addEventListener("click", function (event) {
        event.preventDefault();
        //elimino la seccion loggin
        section.remove();
        var registerSection = buildRegisterSection()

        body.add(registerSection)
    });

    return compo

}

function buildRegisterSection() {
    // Crear sección de registro
    var compo = new Compo(document.createElement('section'))

    var section = compo.container

    var title = document.createElement('h2');
    title.innerText = 'Register';
    section.appendChild(title);

    // Crear formulario de registro
    var form = document.createElement('form');
    section.appendChild(form);

    var nameField = buildFormField('name', 'Name', 'text')
    form.appendChild(nameField[0])
    form.appendChild(nameField[1])

    var emailField = buildFormField('email', 'E-mail', 'email')
    form.appendChild(emailField[0])
    form.appendChild(emailField[1])

    var usernameField = buildFormField('username', 'Username', 'text')
    form.appendChild(usernameField[0])
    form.appendChild(usernameField[1])

    var passwordField = buildFormField('password', 'Password', 'password')
    form.appendChild(passwordField[0])
    form.appendChild(passwordField[1])

    var passwordRepeatField = buildFormField('password-repeat', 'Repeat Password', 'password')
    form.appendChild(passwordRepeatField[0])
    form.appendChild(passwordRepeatField[1])
    // Creamos boton para registrarse 
    var submitButton = buildButton('Register', 'submit')
    form.appendChild(submitButton)

    // creo un evento con datos de formularios para crear usuario
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        // recojo el valos de los inputs y los guardo en la variable newUser

        var name = nameField[1].value
        var email = emailField[1].value
        var username = usernameField[1].value
        var password = passwordField[1].value
        var passwordRepeat = passwordRepeatField[1].value

        try {
            registerUser(name, email, username, password, passwordRepeat)
            // eliminamos seccion registro y volvemos a(crear) section
            section.remove();
            document.body.add(section)
        } catch (error) {
            alert(error.message)

            console.error(error)
        }

    });

    // creamos etiqueta a para ir a login
    var loginLink = document.createElement('a');
    loginLink.href = '';
    loginLink.innerText = 'Login';
    section.appendChild(loginLink);

    // // Muestro la seccion de registro
    // document.body.appendChild(section);

    // evento de etiqueta a para ir a login
    loginLink.addEventListener('click', function (event) {
        event.preventDefault();
        section.remove();
        document.body.add(loginSection);
    });

    return compo
}

function buildHomeSection() {
    // boton evento  login(llamo al formulario para obtener datos)

    var compo = new Compo(document.createElement('section'))

    var section = compo.container

    var title = document.createElement('h2');
    title.innerText = 'Home';
    section.appendChild(title);

    // Mensaje de bienvenida
    var userTitle = document.createElement('h3');
    userTitle.innerText = 'Bienvenido ' + loggedInUser.name;
    section.appendChild(userTitle);

    // Botón de logout
    var logoutLink = buildButton('Logout', 'button');
    section.appendChild(logoutLink);


    // Evento para logout
    logoutLink.addEventListener('click', function (event) {
        event.preventDefault();
        loggedInUser = null;
        section.remove();
        body.add(loginSection)

    });


    return compo
}

