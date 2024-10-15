var loggedInUser = null

var page = new Compo(document.querySelector('body'))

var title = new Heading('UN$0C14L', 1)
page.add(title)

var login = new Login()
page.add(login)

// loggedInUser = users[0]
var home
// home = new Home()
// page.add(home)