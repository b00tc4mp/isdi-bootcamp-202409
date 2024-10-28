//Presentation
var loggedInUser = null

var body = new Compo(document.querySelector('body'))

var title = new Heading('UNSOCIAL', 1)
body.add(title)

var loginSection = new buildLoginSection()

body.add(loginSection)