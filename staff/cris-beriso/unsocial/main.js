let loggedInUser = null

const page = new Compo(document.querySelector('body'))

let title = new Heading('Unsocial', 1)
page.add(title)

const login = new Login()
page.add(login)

let home
//loggedInUser = users[0]

//home = new Home()
//page.add(home)