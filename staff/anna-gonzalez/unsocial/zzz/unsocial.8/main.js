let loggedInUser = null

const page = new Compo(document.querySelector('body'))

const title = new Heading('Unsocial', 1)
page.add(title)

const login = new Login()
page.add(login)

let home