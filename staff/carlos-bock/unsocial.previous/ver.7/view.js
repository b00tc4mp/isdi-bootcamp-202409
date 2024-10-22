function Login() {
    Compo.call(this, document.createElement('section'));

    var compo = this;

    var title = new Heading('Login', 2);
    compo.add(title);
    
    var form = new Form();
    compo.add(form);
    
    form.add(new Label('Username', 'username'));
    var usernameInput = new Input('text', 'username');
    form.add(usernameInput);

    form.add(new Label('password', 'password'));
    var passwordInput = new Input('password', 'password');
    //var br = document.createElement('br'); // break before the button
    //form.appendChild(br);
    form.add(passwordInput);

    var submitButton = new Button('Login', 'submit');
    form.add(submitButton);

    form.addBehavior('submit', function (event) {
        event.preventDefault();

        var username = usernameInput.getValue();
        var password = passwordInput.getValue();

        try {
            loggedInUser = authenticateUser(username, password);

            form.reset();

            compo.remove(); //formally section

            var home = new Home(); //var homeSection = buildHomeSection();

            body.add(home); //body.add(homeSection)
        } catch (error) {
            passwordInput.setValue('');//passwordField[1].value = '';

            alert(error.message);

            console.error(error);
        }

    });

    var registerLink = new Link('Register');
    compo.add(registerLink);

    registerLink.addBehavior('click', function(event) {
        event.preventDefault();

        compo.remove();

        var register = new Register();

        body.add(register);
    });
};

Login.prototype = Object.create(Compo.prototype);
Login.prototype.constructor = Login;

function Register() {
    Compo.call(this, document.createElement('section'));

    var compo = this;

    var title = new Heading('Register', 2);
    compo.add(title);
    
    var form = new Form();
    compo.add(form);

    form.add(new Label('Name', 'name'));
    var nameInput = new Input ('text', 'name');
    form.add(nameInput);

    form.add(new Label('Email', 'email'));
    var emailInput = new Input('email', 'email');
    form.add(emailInput);

    form.add(new Label('Username', 'username'));
    var usernameInput = new Input('text', 'username');
    form.add(usernameInput);

    form.add(new Label('Password', 'password'));
    var passwordInput = new Input('password', 'password');
    form.add(passwordInput);

    form.add(new Label('Repeat Password', 'password-repeat'));
    var passwordRepeatInput = new Input('password', 'password-repeat');
    form.add(passwordRepeatInput);

    var submitButton = new Button('Register', 'submit');
    form.add(submitButton);

    form.addBehavior('submit', function (event) {
        event.preventDefault();

        var name = nameInput.getValue();
        var email = emailInput.getValue();
        var username = usernameInput.getValue();
        var password = passwordInput.getValue();
        var passwordRepeat = passwordRepeatInput.getValue();

        try {
            registerUser(name, email, username, password, passwordRepeat)

            form.reset();

            compo.remove(); //formally section

            body.add(login); // loginSection previously
        } catch (error) {
            alert(error.message);

            console.error(error);
        }
    });

    var loginLink = new Link('login');
    compo.add(loginLink);

    loginLink.addBehavior('click', function(event) {
        event.preventDefault();

        compo.remove();
        body.add(login);
    })
};

Register.prototype = Object.create(Compo.prototype);
Register.prototype.constructor = Register;


function Home() {
    Compo.call(this, document.createElement('section'));

    var compo = this;

    var title = new Heading('Home', 2);
    compo.add(title);

    var userTitle = new Heading('Hello, ' + loggedInUser.name + '!',3);
    compo.add(userTitle);

    var logoutButton = new Button('logout', 'button');
    compo.add(logoutButton);

    logoutButton.addBehavior('click', function (event){
        event.preventDefault();

        loggedInUser = null;

        compo.remove();

        body.add(login); 
    });
}


Home.prototype = Object.create(Compo.prototype);
Home.prototype.constructor = Home;

