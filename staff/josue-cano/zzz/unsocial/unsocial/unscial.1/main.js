var loggedInUser = null

// Creación de la sección de login
var loginSection = document.createElement("section");

var loginTitle = document.createElement("h2");
loginTitle.innerText = "Login";
loginSection.appendChild(loginTitle);

// Crear formulario de login
var loginForm = document.createElement('form');
//aqui le estamos diciendo que el formulario va en la seccion que es el padre y form es el hijo
loginSection.appendChild(loginForm);

// Crear label e input para el nombre de usuario
var loginUsernameLabel = document.createElement("label");
loginUsernameLabel.htmlFor = "username";
loginUsernameLabel.innerText = "Username";
loginForm.appendChild(loginUsernameLabel);

// creo el loginUsername
var loginUsernameInput = document.createElement("input");
loginUsernameInput.type = "text";
loginUsernameInput.id = "username";
loginUsernameInput.placeholder = "Escribe aquí si quieres...";
loginUsernameInput.required = true;
loginForm.appendChild(loginUsernameInput);

// Crear label e input para la contraseña
var loginPasswordLabel = document.createElement('label');
loginPasswordLabel.htmlFor = 'password';
loginPasswordLabel.innerText = 'Password';
loginForm.appendChild(loginPasswordLabel);

var loginPasswordInput = document.createElement('input');
loginPasswordInput.type = 'password';
loginPasswordInput.id = 'password';
loginForm.appendChild(loginPasswordInput);

// Crear botón de login
var loginSubmitButton = document.createElement('button');
loginSubmitButton.type = 'submit';
loginSubmitButton.innerText = 'Login';
loginForm.appendChild(loginSubmitButton);

// Crear enlace para ir a la página de registro
var loginRegisterLink = document.createElement('a');
loginRegisterLink.href = '';
loginRegisterLink.innerText = 'Register';
loginSection.appendChild(loginRegisterLink);

// Evento al clicar el enlace de registro
loginRegisterLink.addEventListener("click", function (event) {
    event.preventDefault();
    //elimino la seccion loggin
    loginSection.remove();

    // Crear sección de registro
    var registerSection = document.createElement('section');
    var registerTitle = document.createElement('h2');
    registerTitle.innerText = 'Register';
    registerSection.appendChild(registerTitle);

    // Crear formulario de registro
    var registerForm = document.createElement('form');
    registerSection.appendChild(registerForm);

    // Crear label  para el nombre
    var registerNameLabel = document.createElement('label');
    registerNameLabel.htmlFor = 'name';
    registerNameLabel.innerText = 'Name';
    registerForm.appendChild(registerNameLabel);
    //creo el input 
    var registerNameInput = document.createElement('input');
    registerNameInput.type = 'text';
    registerNameInput.id = 'name';
    registerForm.appendChild(registerNameInput);

    // Crear label e input para el email
    var registerEmailLabel = document.createElement('label');
    registerEmailLabel.htmlFor = 'email';
    registerEmailLabel.innerText = 'E-mail';
    registerForm.appendChild(registerEmailLabel);

    var registerEmailInput = document.createElement('input');
    registerEmailInput.type = 'email';
    registerEmailInput.id = 'email';
    registerForm.appendChild(registerEmailInput);

    // creo el label de ussername 
    var registerUsernameLabel = document.createElement('label');
    registerUsernameLabel.htmlFor = 'username';
    registerUsernameLabel.innerText = 'Username';
    registerForm.appendChild(registerUsernameLabel);

    var registerUsernameInput = document.createElement('input');
    registerUsernameInput.type = 'text';
    registerUsernameInput.id = 'username';
    registerForm.appendChild(registerUsernameInput);

    // creamos etiqueta label del password insertamos el for y password
    var registerPasswordLabel = document.createElement('label');
    registerPasswordLabel.htmlFor = 'password';
    registerPasswordLabel.innerText = 'Password';
    registerForm.appendChild(registerPasswordLabel);

    var registerPasswordInput = document.createElement('input');
    registerPasswordInput.type = 'password';
    registerPasswordInput.id = 'password';
    registerForm.appendChild(registerPasswordInput);

    var registerPasswordRepeatLabel = document.createElement('label')
    registerPasswordRepeatLabel.htmlFor = 'password-repeat'
    registerPasswordRepeatLabel.innerText = 'Repeat Password'
    registerForm.appendChild(registerPasswordRepeatLabel)

    var registerPasswordRepeatInput = document.createElement('input')
    registerPasswordRepeatInput.type = 'password'
    registerPasswordRepeatInput.id = 'password-repeat'
    registerForm.appendChild(registerPasswordRepeatInput)

    // Creamos boton para registrarse
    var registerSubmitButton = document.createElement('button');
    registerSubmitButton.type = 'submit';
    registerSubmitButton.innerText = 'Register';
    registerForm.appendChild(registerSubmitButton);

    // creo un evento con datos de formularios para crear usuario
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();
        // recojo el valos de los inputs y los guardo en la variable newUser

        var name = registerNameInput.value;
        var email = registerEmailInput.value;
        var username = registerUsernameInput.value;
        var password = registerPasswordInput.value;
        var passwordRepeat = registerPasswordRepeatInput.value;

        try {
            registerUser(name, email, username, password, passwordRepeat)
            // eliminamos seccion registro y volvemos a(crear) loginSection
            registerSection.remove();
            document.body.appendChild(loginSection)
        } catch (error) {
            alert(error.message)

            console.error(error)
        }

    });

    // creamos etiqueta a para ir a login
    var registerLoginLink = document.createElement('a');
    registerLoginLink.href = '';
    registerLoginLink.innerText = 'Login';
    registerSection.appendChild(registerLoginLink);

    // Muestro la seccion de registro
    document.body.appendChild(registerSection);

    // evento de etiqueta a para ir a login
    registerLoginLink.addEventListener('click', function (event) {
        event.preventDefault();
        registerSection.remove();
        document.body.appendChild(loginSection);
    });
});

// boton evento  login(llamo al formulario para obtener datos)
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    //guardo los valores de login en las variables
    var username = loginUsernameInput.value;
    var password = loginPasswordInput.value;
    try {
        loggedInUser = authenticateUser(username, password);
        loginForm.reset();
        loginSection.remove();

        var homeSection = document.createElement('section');
        var homeTitle = document.createElement('h2');
        homeTitle.innerText = 'Home';
        homeSection.appendChild(homeTitle);

        // Mensaje de bienvenida
        var welcomeMessage = document.createElement('h3');
        welcomeMessage.innerText = 'Bienvenido ' + loggedInUser.name;
        homeSection.appendChild(welcomeMessage);

        // Botón de logout
        var logoutLink = document.createElement('button');
        logoutLink.innerText = 'Logout';
        homeSection.appendChild(logoutLink);

        document.body.appendChild(homeSection);

        // Evento para logout
        logoutLink.addEventListener('click', function (event) {
            event.preventDefault();
            loggedInUser = null;
            homeSection.remove();
            document.body.appendChild(loginSection);
        });
    } catch (error) {
        loginPasswordInput.value = '';
        alert(error.message);
        console.error(error);
    }
    // compruebo que el usuario es correcto esta dentro del array que condicida login y contraseña y lo almaceno en user 


});

// Muestro la sección de login en la página

document.body.appendChild(loginSection);
