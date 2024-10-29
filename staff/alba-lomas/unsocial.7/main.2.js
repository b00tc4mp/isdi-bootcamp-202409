


var loggedInUser = null

var body = new Compo(document.querySelector('body'))

var title = new Heading('Unsocial', 1)
body.add(title)

var loginSection = buildLoginSection()

body.add(loginSection)