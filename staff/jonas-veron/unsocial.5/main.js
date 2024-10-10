var loggedInUser = null

var body = new Compo(document.querySelector('body'))

    var title = new Heading('Welcome to Unsocial', 1)
    body.add(title)

    var login = new Login()

    body.add(login)

