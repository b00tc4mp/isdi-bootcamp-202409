


function Register() {
    Compo.call(this, document.createElement('section'));

    var title = new Heading('Register', 2);
    this.add(title);
    
    var form = new Form();
    this.add(form);

    form.add(new Label('Name', 'name'));
    var nameInput = new Input ('text', 'name');
    form.add(nameInput);

    form.add(new Label('E-mail', 'email'));
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

            this.remove(); 

            page.add(login); 
        } catch (error) {
            alert(error.message);

            console.error(error);
        }
    }.bind(this));

    var loginLink = new Link('login');
    this.add(loginLink);

    loginLink.addBehavior('click', function(event) {
        event.preventDefault();

        this.removeSelf();
        page.add(login);
    }.bind(this));
};

Register.extends(Compo);

//Register.prototype = Object.create(Compo.prototype);
//Register.prototype.constructor = Register;
