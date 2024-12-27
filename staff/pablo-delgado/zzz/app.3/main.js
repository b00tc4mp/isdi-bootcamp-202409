var loggedInUser = null

var page = new Compo(document.querySelector('body'))

var title = new Heading('Unsocial', 1)//error aquí
page.add(title)

var login = new Login()
page.add(login)