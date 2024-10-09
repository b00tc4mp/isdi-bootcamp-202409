function buildFormField(id, text, type) {
    var label = document.createElement('label');
    label.htmlFor = id;
    label.innerHTML = text;

    var input = document.createElement('input');
    input.type = type;
    input.id = id;

    return [label, input];
}

function buildButton(text, type) {
    var button = document.createElement('button');
    button.type = type;
    button.innerText = text;

    return button;
}

function buildLoginSection() {
    var compo = new Compo(document.createElement('section'));

    var section = compo.container;
    
    var title = document.createElement('h2');
    title.innerHTML = 'Login';
    section.appendChild(title);

    var form = document.createElement('form');
    section.appendChild(form);

    var usernameField = buildFormField('username', 'Username','text')
    form.appendChild(usernameField[0]);
    form.appendChild(usernameField[1]);

    var passwordField = buildFormField('password', 'Passord', 'password')
    form.appendChild(passwordField[0]);
    form.appendChild(passwordField[1]);
    
    var submitButton = buildButton('Login', 'submit');
    form.appendChild(submitButton);

    form.appendChild(submitButton);

    form.addEventListener('submit', function(event) {
        event.preventDefault

        var username = usernameField[1].value;
        var password = passwordField[1].value;

        try {
            loggedInUser = authenticateUser(username, password);

            form.reset();

            section.remove();

            var homeSection = buildHomeSection();

            body.add(homeSection)
        } catch (error) {
            passwordField[1].value = '';

            alert(error.message);

            console.error(error);
        }
    });

    var registerLink = document.createElement('a');
    registerLink.href = '';
    registerLink.innerHTML = 'Register';
    section.appendChild(registerLink);

    registerLink.addEventListener('click', function (event) {
        event.preventDefault();

        section.remove();

        var registerSection = buildLoginSection();

        body.add(registerSection)
    });

    return compo; 
};

function buildRegisterSection() {
    var compo  = new Compo(document.createElement('section'));

    var section = compo.container;

    var title = document.createElement('h2');
    title.innerText = 'Register';
    section.appendChild(title);
    
    var form = document.createElement('form');
    section.appendChild(form);

    var nameField = buildFormField('name', 'Name', 'text')
    form.appendChild(nameField[0]);
    form.appendChild(nameField[1]);

    var emailField = buildFormField('email', 'E-mail', 'email');
    form.appendChild(emailField[0]);
    form.appendChild(emailField[1]);

    var usernameField = buildFormField('username', 'Username', 'text');
    form.appendChild(usernameField[0]);
    form.appendChild(usernameField[1]);

    var passwordField = buildFormField('password', 'Password', 'password')
    form.appendChild(passwordField[0]);
    form.appendChild(passwordField[1]);

    var passwordRepeatField = buildFormField('password-repeat', 'Repeat Password', 'password')
    form.appendChild(passwordRepeatField[0]);
    form.appendChild(passwordRepeatField[1]);

    var submitButton = buildButton('Register' , 'submit');
    form.appendChild(submitButton);

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var name = nameField[1].value;
        var email = emailField[1].value;
        var username = usernameField[1].value;
        var password = passwordField[1].value;
        var passwordRepeat = passwordField[1].value;

       
        try {
            registerUser(name, email, username, password, passwordRepeat)

            form.reset();

            section.remove();

            body.add(loginSection);
        } catch (error) {
            alert(error.message);

            console.error(error);
        }
    });

    var loginLink = document.createElement('a');
    loginLink.href = '';
    loginLink.innerText = 'Login';
    section.appendChild(loginLink);

    loginLink.addEventListener('click', function (event) {
        event.preventDefault();

        section.remove();
        body.add(loginSection);
    })

    return compo;
};

function buildHomeSection() {
    var compo = new Compo(document.createElement('section')) 

    var section = compo.container; 

    var title = document.createElement('h2');
    title.innerText = 'Home';
    section.appendChild(title); 

    var userTitle = document.createElement('h3');
    userTitle.innerText = 'Hello, ' + loggedInUser.name + '!';
    section.appendChild(userTitle);

    var logoutButton = buildButton('logout', 'button');
    section.appendChild(logoutButton);
    
    logoutButton.addEventListener('click', function (event) {
        event.preventDefault();

        loggedInUser = null;

        section.remove();

        body.add(loginSection); 
    });

    return compo;

}

