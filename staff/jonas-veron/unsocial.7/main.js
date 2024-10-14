var loggedInUser = null

var page = new Compo(document.querySelector('body'))

    var title = new Heading('Welcome to Unsocial', 1)
    page.add(title)

    var login = new Login()

    page.add(login)

    var home

