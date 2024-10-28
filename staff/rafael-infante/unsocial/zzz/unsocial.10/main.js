var loggedUser = null

var header = new Header('logo-container')
var picture = new Picture('images/users-avatar.png', 'logo')
header.add(picture)
var heading = new Heading('unSocial', 1)
header.add(heading)

var login = new Login()

var page = new Compo(document.querySelector('body'))

page.add(header)
page.add(login)

//loggedUser = users[1]
var home
// page.add(home)