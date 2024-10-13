var loggedUser = null

var header = new Header('logo-container')
var heading = new Heading('unSocial', 1)
header.add(heading)
var picture = new Picture('/staff/rafael-infante/unsocial/images/users-avatar.png', 'logo')
header.add(picture)

var loginSection = buildLoginSection()

var body = new Compo(document.querySelector('body'))

body.add(header)
body.add(loginSection)