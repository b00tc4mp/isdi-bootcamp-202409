/**
 * Build a Login instance
 */
function Login() {
    Compo.call(this, document.createElement('section'));
    // var compo = this; commented out instead of using compo or self we will using binding in this iteration
    var title = new Heading('Login', 2);
    this.add(title);
    
    var form = new Form();
    this.add(form);
    
    form.add(new Label('Username', 'username'));
    var usernameInput = new Input('text', 'username');
    form.add(usernameInput);

    form.add(new Label('password', 'password'));
    var passwordInput = new Input('password', 'password');
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

            this.remove(); //formally section

            var home = new Home(); //var homeSection = buildHomeSection();

            page.add(home); //body.add(homeSection) // now body replaced with page
        } catch (error) {
            passwordInput.setValue('');//passwordField[1].value = '';

            alert(error.message);

            console.error(error);
        }

    }.bind(this));

    var registerLink = new Link('Register');
    this.add(registerLink);

    registerLink.addBehavior('click', function(event) {
        event.preventDefault();

        this.remove();

        var register = new Register();

        page.add(register);
    }.bind(this));
};

Login.prototype = Object.create(Compo.prototype);
Login.prototype.constructor = Login;

/**
 * Builds a Register instance
 */
function Register() {
    Compo.call(this, document.createElement('section'));
    //var compo = this;// this is commented out to use bind instead
    var title = new Heading('Register', 2);
    this.add(title);
    
    var form = new Form();
    this.add(form);

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

            this.remove(); //formally section

            page.add(login); // loginSection previously
        } catch (error) {
            alert(error.message);

            console.error(error);
        }
    }.bind(this));

    var loginLink = new Link('login');
    this.add(loginLink);

    loginLink.addBehavior('click', function(event) {
        event.preventDefault();

        this.remove();
        page.add(login);
    }.bind(this));
};

Register.prototype = Object.create(Compo.prototype);
Register.prototype.constructor = Register;

/**
 * Buils a Home instance
 */
function Home() {
    Compo.call(this, document.createElement('section'));
    //var compo = this;//commented out to use bind instead
    var title = new Heading('Home', 2);
    this.add(title);

    var userTitle = new Heading('Hello, ' + loggedInUser.name + '!',3);
    this.add(userTitle);

    var logoutButton = new Button('logout', 'button');
    this.add(logoutButton);

    logoutButton.addBehavior('click', function (event){
        event.preventDefault();

        loggedInUser = null;

        this.remove();

        page.add(login); 
    }.bind(this));
}

Home.prototype = Object.create(Compo.prototype);
Home.prototype.constructor = Home;

