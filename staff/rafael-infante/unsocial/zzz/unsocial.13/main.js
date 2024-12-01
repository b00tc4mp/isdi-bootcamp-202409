let loggedUser = null

const header = new Header('logo-container')
const picture = new Picture('images/users-avatar.png', 'logo')
header.add(picture)
const heading = new Heading('unSocial', 1)
header.add(heading)

const login = new Login()

const page = new Compo(document.querySelector('body'))

page.add(header)
page.add(login)

let home