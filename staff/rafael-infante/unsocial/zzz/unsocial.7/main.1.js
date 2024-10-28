var loggedUser = null

var header = buildHeader('logo-container', '/staff/rafael-infante/unsocial/images/users-avatar.png', 'logo')

var loginSection = buildLoginSection()

var body = new Compo(document.querySelector('body'))

body.add(header)
body.add(loginSection)